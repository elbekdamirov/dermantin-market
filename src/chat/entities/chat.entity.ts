import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "../../user/entities/user.entity";
import { Store } from "../../store/entities/store.entity";
import { Message } from "src/message/entities/message.entity";

@ObjectType()
@Entity()
export class Chat {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.chats, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Field(() => Int)
  userId: number;

  @Field(() => Store)
  @ManyToOne(() => Store, (store) => store.chats, { onDelete: "CASCADE" })
  @JoinColumn({ name: "storeId" })
  store: Store;

  @Field(() => Int)
  storeId: number;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
