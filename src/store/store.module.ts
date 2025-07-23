import { Module } from "@nestjs/common";
import { StoreService } from "./store.service";
import { StoreController } from "./store.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Store } from "./entities/store.entity";
import { User } from "src/user/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Store,
      User,
      //   Review
    ]),
  ],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
