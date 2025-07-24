import { Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateHistoryDto {
  @ApiProperty({ example: 1 })
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 1 })
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  dermantinId: number;
}
