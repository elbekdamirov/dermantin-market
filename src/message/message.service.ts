import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "./entities/message.entity";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>
  ) {}

  create(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = this.messageRepository.create(createMessageDto);
    return this.messageRepository.save(message);
  }

  findAll(): Promise<Message[]> {
    return this.messageRepository.find({
      relations: ["chat"],
    });
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.messageRepository.findOneBy({ id });

    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }

    return message;
  }

  async update(
    id: number,
    updateMessageDto: UpdateMessageDto
  ): Promise<Message> {
    await this.messageRepository.update(id, updateMessageDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.messageRepository.delete(id);
  }
}
