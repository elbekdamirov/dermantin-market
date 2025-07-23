import { Module } from "@nestjs/common";
import { SocialsController } from "./socials.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Social } from "./entities/social.entity";
import { Store } from "src/store/entities/store.entity";
import { SocialService } from "./socials.service";

@Module({
  imports: [TypeOrmModule.forFeature([Social, Store])],
  controllers: [SocialsController],
  providers: [SocialService],
})
export class SocialsModule {}
