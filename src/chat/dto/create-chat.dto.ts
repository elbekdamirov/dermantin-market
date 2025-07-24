import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateChatDto {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  storeId: number;
}
