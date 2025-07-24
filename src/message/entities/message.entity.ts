import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "../../chat/entities/chat.entity";

@ObjectType()
@Entity()
export class Message {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column({ default: false })
  is_read: boolean;

  @Field(() => Chat)
  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: "CASCADE" })
  chat: Chat;

  @Field(() => Int)
  @Column()
  chatId: number;
}
