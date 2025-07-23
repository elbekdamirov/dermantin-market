import { Module } from "@nestjs/common";
import { ReviewsController } from "./reviews.controller";
import { ReviewService } from "./reviews.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./entities/review.entity";
import { Dermantin } from "src/dermantin/entities/dermantin.entity";
import { User } from "src/user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Review, Dermantin, User])],
  controllers: [ReviewsController],
  providers: [ReviewService],
})
export class ReviewsModule {}
