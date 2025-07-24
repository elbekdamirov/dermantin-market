import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ChatService } from "./chat.service";
import { Chat } from "./entities/chat.entity";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => Chat)
  createChat(
    @Args("createChatDto") createChatDto: CreateChatDto
  ): Promise<Chat> {
    return this.chatService.create(createChatDto);
  }

  @Query(() => [Chat])
  findAllChats(): Promise<Chat[]> {
    return this.chatService.findAll();
  }

  @Query(() => Chat)
  findOneChat(@Args("id", { type: () => Int }) id: number): Promise<Chat> {
    return this.chatService.findOne(id);
  }

  @Mutation(() => Chat)
  updateChat(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateChatDto") updateChatDto: UpdateChatDto
  ): Promise<Chat> {
    return this.chatService.update(id, updateChatDto);
  }

  @Mutation(() => Boolean)
  async removeChat(
    @Args("id", { type: () => Int }) id: number
  ): Promise<boolean> {
    await this.chatService.remove(id);
    return true;
  }
}
