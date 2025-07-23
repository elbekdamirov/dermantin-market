import { Module } from "@nestjs/common";
import { DermantinService } from "./dermantin.service";
import { DermantinController } from "./dermantin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/category/entities/category.entity";
import { Dermantin } from "./entities/dermantin.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Category, Dermantin])],
  controllers: [DermantinController],
  providers: [DermantinService],
})
export class DermantinModule {}
