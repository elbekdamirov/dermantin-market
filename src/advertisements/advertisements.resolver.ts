import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";
import { Advertisement } from "./entities/advertisement.entity";
import { AdvertisementService } from "./advertisements.service";

@Resolver(() => Advertisement)
export class AdvertisementResolver {
  constructor(private readonly service: AdvertisementService) {}

  @Mutation(() => Advertisement)
  createAdvertisement(@Args("input") input: CreateAdvertisementDto) {
    return this.service.create(input);
  }

  @Query(() => [Advertisement], { name: "advertisements" })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => Advertisement, { name: "advertisement" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }
}
