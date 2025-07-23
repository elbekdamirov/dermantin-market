import { Module } from "@nestjs/common";
import { AdvertisementsController } from "./advertisements.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Advertisement } from "./entities/advertisement.entity";
import { Dermantin } from "src/dermantin/entities/dermantin.entity";
import { AdvertisementService } from "./advertisements.service";

@Module({
  imports: [TypeOrmModule.forFeature([Advertisement, Dermantin])],
  controllers: [AdvertisementsController],
  providers: [AdvertisementService],
})
export class AdvertisementsModule {}
