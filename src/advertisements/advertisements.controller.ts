import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";
import { UpdateAdvertisementDto } from "./dto/update-advertisement.dto";
import { AdvertisementService } from "./advertisements.service";

@Controller("advertisements")
export class AdvertisementsController {
  constructor(private readonly advertisementsService: AdvertisementService) {}

  @Post()
  create(@Body() createAdvertisementDto: CreateAdvertisementDto) {
    return this.advertisementsService.create(createAdvertisementDto);
  }

  @Get()
  findAll() {
    return this.advertisementsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.advertisementsService.findOne(+id);
  }
}
