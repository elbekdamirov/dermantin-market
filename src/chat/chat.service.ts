import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat } from "./entities/chat.entity";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>
  ) {}

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    const chat = this.chatRepository.create(createChatDto);
    return await this.chatRepository.save(chat);
  }

  async findAll(): Promise<Chat[]> {
    return await this.chatRepository.find({
      relations: ["user", "store"],
    });
  }

  async findOne(id: number): Promise<Chat> {
    const chat = await this.chatRepository.findOne({
      where: { id },
      relations: ["user", "store"],
    });
    if (!chat) {
      throw new NotFoundException(`Chat with id ${id} not found`);
    }
    return chat;
  }

  async update(id: number, updateChatDto: UpdateChatDto): Promise<Chat> {
    const chat = await this.chatRepository.preload({
      id,
      ...updateChatDto,
    });
    if (!chat) {
      throw new NotFoundException(`Chat with id ${id} not found`);
    }
    return await this.chatRepository.save(chat);
  }

  async remove(id: number): Promise<void> {
    const result = await this.chatRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Chat with id ${id} not found`);
    }
  }
}
