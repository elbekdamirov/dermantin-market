import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UserRole, UserRegion, UserLang } from "../entities/user.entity";

@InputType()
export class CreateUserDto {
  @Field()
  @ApiProperty({
    example: "Ali Valiyev",
    description: "Foydalanuvchi to‘liq ismi",
  })
  fullname: string;

  @Field()
  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  phone: string;

  @Field(() => UserRole)
  @ApiProperty({ enum: UserRole, description: "Foydalanuvchi roli" })
  role: UserRole;

  @Field(() => UserRegion)
  @ApiProperty({ enum: UserRegion, description: "Hudud (viloyat)" })
  region: UserRegion;

  @Field(() => UserLang)
  @ApiProperty({ enum: UserLang, description: "Til (uz yoki ru)" })
  lang: UserLang;
}
