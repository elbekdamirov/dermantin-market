import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateHistoryDto } from "./create-history.dto";
import { Field, Int } from "@nestjs/graphql";
import { IsInt, IsOptional } from "class-validator";

export class UpdateHistoryDto extends PartialType(CreateHistoryDto) {
  @ApiPropertyOptional({ example: 1 })
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  userId?: number;

  @ApiPropertyOptional({ example: 1 })
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  dermantinId?: number;
}
