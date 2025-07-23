import { Module } from "@nestjs/common";
import { PaymentsController } from "./payments.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { User } from "src/user/entities/user.entity";
import { Order } from "src/order/entities/order.entity";
import { PaymentService } from "./payments.service";

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User, Order])],
  controllers: [PaymentsController],
  providers: [PaymentService],
})
export class PaymentsModule {}
