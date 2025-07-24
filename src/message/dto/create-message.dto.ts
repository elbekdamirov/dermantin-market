import { InputType, Field, Int } from "@nestjs/graphql";
import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateMessageDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  text: string;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  is_read: boolean;

  @Field(() => Int)
  @IsInt()
  chatId: number;
}
