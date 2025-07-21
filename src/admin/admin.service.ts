import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "./entities/admin.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;

    if (password !== confirm_password) {
      new BadRequestException("Passwords didn't match");
    }

    const hashed_password = await bcrypt.hash(password, 7);

    const admin = this.adminRepo.create({
      ...createAdminDto,
      password: hashed_password,
    });
    return this.adminRepo.save(admin);
  }

  findAll() {
    return this.adminRepo.find();
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  findByEmail(email: string) {
    return this.adminRepo.findOneBy({ email });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(id);
    Object.assign(admin, updateAdminDto);
    return this.adminRepo.save(admin);
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    await this.adminRepo.remove(admin);
    return true;
  }

  async updateRefreshToken(id: number, hashedRefreshToken: string) {
    const admin = await this.adminRepo.findOneBy({ id });

    if (!admin) {
      throw new NotFoundException("Admin not found");
    }

    admin.hashed_refresh_token = hashedRefreshToken;
    await this.adminRepo.save(admin);
  }
}
