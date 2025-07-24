import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { History } from "./entities/history.entity";
import { UpdateHistoryDto } from "./dto/update-history.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateHistoryDto } from "./dto/create-history.dto";

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>
  ) {}

  async create(dto: CreateHistoryDto) {
    const history = this.historyRepository.create(dto);
    return this.historyRepository.save(history);
  }

  async findAll() {
    return this.historyRepository.find({
      relations: ["user", "dermantin"],
    });
  }

  async findOne(id: number) {
    const history = await this.historyRepository.findOne({
      where: { id },
      relations: ["user", "dermantin"],
    });
    if (!history) {
      throw new NotFoundException("History topilmadi");
    }
    return history;
  }

  async update(id: number, dto: UpdateHistoryDto) {
    const history = await this.findOne(id);
    Object.assign(history, dto);
    return this.historyRepository.save(history);
  }

  async remove(id: number) {
    await this.historyRepository.delete(id);
  }
}
