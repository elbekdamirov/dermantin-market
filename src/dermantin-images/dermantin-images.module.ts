import { Module } from "@nestjs/common";
import { DermantinImageService } from "./dermantin-images.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DermantinImage } from "./entities/dermantin-image.entity";
import { DermantinImageController } from "./dermantin-images.controller";

@Module({
  imports: [TypeOrmModule.forFeature([DermantinImage])],
  controllers: [DermantinImageController],
  providers: [DermantinImageService],
})
export class DermantinImagesModule {}
