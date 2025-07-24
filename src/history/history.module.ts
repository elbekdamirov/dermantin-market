import { Module } from "@nestjs/common";
import { HistoryService } from "./history.service";
import { HistoryController } from "./history.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Dermantin } from "src/dermantin/entities/dermantin.entity";
import { History } from "./entities/history.entity";

@Module({
  imports: [TypeOrmModule.forFeature([History, User, Dermantin])],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
