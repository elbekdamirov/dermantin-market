import { ObjectType, Field, registerEnumType, ID } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
  USER = "user",
  MANAGER = "manager",
}

export enum UserLang {
  UZ = "uz",
  RU = "ru",
}

export enum UserRegion {
  ANDIJON = "Andijon",
  BUXORO = "Buxoro",
  FARGONA = "Fargʻona",
  JIZZAX = "Jizzax",
  XORAZM = "Xorazm",
  NAMANGAN = "Namangan",
  NAVOIY = "Navoiy",
  QASHQADARYO = "Qashqadaryo",
  QORAQALPOGISTON = "Qoraqalpog'iston",
  SAMARQAND = "Samarqand",
  SIRDARYO = "Sirdaryo",
  SURXONDARYO = "Surxondaryo",
  TOSHKENT = "Toshkent",
}

registerEnumType(UserRole, { name: "UserRole" });
registerEnumType(UserLang, { name: "UserLang" });
registerEnumType(UserRegion, { name: "UserRegion" });

@ObjectType()
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  @ApiProperty({ example: 1, description: "User ID raqami" })
  id: number;

  @Column()
  @Field()
  @ApiProperty({
    example: "Ali Valiyev",
    description: "Foydalanuvchi to‘liq ismi",
  })
  fullname: string;

  @Column({ unique: true })
  @Field()
  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  phone: string;

  @Column({ type: "enum", enum: UserRole })
  @Field(() => UserRole)
  @ApiProperty({
    enum: UserRole,
    description: "Foydalanuvchi roli (user yoki manager)",
  })
  role: UserRole;

  @Column({ type: "bigint", default: 0 })
  @Field()
  @ApiProperty({
    example: 0,
    description: "Tasdiqlanganlik statusi (1 = tasdiqlangan)",
  })
  is_verified: number;

  @Column({ type: "enum", enum: UserRegion })
  @Field(() => UserRegion)
  @ApiProperty({ enum: UserRegion, description: "Hudud (viloyat)" })
  region: UserRegion;

  @Column({ type: "enum", enum: UserLang })
  @Field(() => UserLang)
  @ApiProperty({ enum: UserLang, description: "Til (uz yoki ru)" })
  lang: UserLang;
}
