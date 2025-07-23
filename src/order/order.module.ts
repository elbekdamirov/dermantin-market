import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { Order } from "./entities/order.entity";
import { User } from "src/user/entities/user.entity";
import { Store } from "src/store/entities/store.entity";
import { Dermantin } from "src/dermantin/entities/dermantin.entity";
import { OrderResolver } from "./order.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Store, Dermantin])],
  controllers: [OrderController],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}
