import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { PaymentService } from "./payments.service";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(+id);
  }
}
