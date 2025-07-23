import { InputType, Field, Float, PartialType } from "@nestjs/graphql";
import { CreateDermantinDto } from "./create-dermantin.dto";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class UpdateDermantinDto extends PartialType(CreateDermantinDto) {
  @ApiProperty()
  @Field()
  id: number;
}
