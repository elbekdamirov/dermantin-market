import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { HistoryService } from "./history.service";
import { CreateHistoryDto } from "./dto/create-history.dto";
import { UpdateHistoryDto } from "./dto/update-history.dto";
import { History } from "./entities/history.entity";

@Resolver(() => History)
export class HistoryResolver {
  constructor(private readonly historyService: HistoryService) {}

  @Mutation(() => History)
  createHistory(
    @Args("createHistoryInput") createHistoryDto: CreateHistoryDto
  ) {
    return this.historyService.create(createHistoryDto);
  }

  @Query(() => [History], { name: "history" })
  findAll() {
    return this.historyService.findAll();
  }

  @Query(() => History, { name: "history" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.historyService.findOne(id);
  }

  @Mutation(() => History)
  updateHistory(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateHistoryInput") updateHistoryDto: UpdateHistoryDto
  ) {
    return this.historyService.update(id, updateHistoryDto);
  }

  @Mutation(() => Boolean)
  removeHistory(@Args("id", { type: () => Int }) id: number) {
    return this.historyService.remove(id);
  }
}
