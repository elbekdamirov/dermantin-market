import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "src/admin/admin.service";
import * as bcrypt from "bcrypt";
import { LoginAdminDto } from "src/admin/dto/login-admin.dto";
import { CreateAdminDto } from "src/admin/dto/create-admin.dto";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private jwtService: JwtService
  ) {}

  async generateTokens(admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
        expiresIn: process.env.ADMIN_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_REFRESH_TOKEN_KEY,
        expiresIn: process.env.ADMIN_REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async registration(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findByEmail(createAdminDto.email);
    if (candidate) {
      throw new ConflictException("This user already exists");
    }
    const admin = await this.adminService.create(createAdminDto);
    return { adminId: admin.id };
  }

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const admin = await this.adminService.findByEmail(loginAdminDto.email);
    if (!admin) {
      throw new UnauthorizedException("Email or password is incorrect");
    }

    const isMatch = await bcrypt.compare(
      loginAdminDto.password,
      admin.password
    );

    if (!isMatch) {
      throw new UnauthorizedException("Email or password is incorrect");
    }

    const { accessToken, refreshToken } = await this.generateTokens(admin);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.adminService.updateRefreshToken(admin.id, hashedRefreshToken);

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { adminId: admin.id, accessToken };
  }

  async logout(refreshToken: string, res: Response) {
    let adminData: any;
    try {
      adminData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }

    if (!adminData) {
      throw new ForbiddenException("User not verified");
    }

    await this.adminService.updateRefreshToken(adminData.id, "");

    res.clearCookie("refreshToken");
    return {
      message: "User logged out successfully",
    };
  }

  async refreshToken(
    userId: number,
    refreshTokenFromCookie: string,
    res: Response
  ) {
    const decodedToken = await this.jwtService.decode(refreshTokenFromCookie);

    if (userId !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan");
    }

    const user = await this.adminService.findOne(userId);

    if (!user || !user.hashed_refresh_token) {
      throw new NotFoundException("user not found");
    }

    const tokenMatch = await bcrypt.compare(
      refreshTokenFromCookie,
      user.hashed_refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);

    const newHashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.adminService.updateRefreshToken(user.id, newHashedRefreshToken);

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "User refreshed",
      userId: user.id,
      accessToken: accessToken,
    };
    return response;
  }
}
