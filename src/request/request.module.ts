import { Module } from "@nestjs/common";
import { RequestService } from "./request.service";
import { RequestController } from "./request.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Request])],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
