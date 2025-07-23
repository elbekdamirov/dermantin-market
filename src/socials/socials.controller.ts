import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CreateSocialDto } from "./dto/create-social.dto";
import { UpdateSocialDto } from "./dto/update-social.dto";
import { SocialService } from "./socials.service";

@Controller("socials")
export class SocialsController {
  constructor(private readonly socialsService: SocialService) {}

  @Post()
  create(@Body() createSocialDto: CreateSocialDto) {
    return this.socialsService.create(createSocialDto);
  }

  @Get()
  findAll() {
    return this.socialsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.socialsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSocialDto: UpdateSocialDto) {
    return this.socialsService.update(+id, updateSocialDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.socialsService.remove(+id);
  }
}
