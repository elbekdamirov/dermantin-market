import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserResolver } from "./user.resolver";
import { Request } from "src/request/entities/request.entity";
import { History } from "src/history/entities/history.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Request, History])],
  controllers: [UserController],
  providers: [UserService, UserResolver],
})
export class UserModule {}
