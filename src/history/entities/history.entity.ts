import { Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Dermantin } from "src/dermantin/entities/dermantin.entity";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("history")
export class History {
  @ApiProperty({ example: 1 })
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1 })
  @Field(() => Int)
  @Column()
  dermantinId: number;

  @ApiProperty({ example: 1 })
  @Field(() => Int)
  @Column()
  userId: number;

  @ManyToOne(() => Dermantin, (dermantin) => dermantin.histories, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "dermantinId" })
  @Field(() => Dermantin)
  dermantin: Dermantin;

  @ManyToOne(() => User, (user) => user.histories, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  @Field(() => User)
  user: User;
}
