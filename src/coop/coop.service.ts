import { Injectable } from '@nestjs/common';
import { CreateCoopDto } from './dto/create-coop.dto';
import { UpdateCoopDto } from './dto/update-coop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coop } from './entities/coop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoopService {
  constructor(
    @InjectRepository(Coop) private coopRepository: Repository<Coop>
  ) {}
  create(createCoopDto: CreateCoopDto) {
    return 'This action adds a new coop';
  }

  findAll() {
    return `This action returns all coop`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coop`;
  }

  update(id: number, updateCoopDto: UpdateCoopDto) {
    return `This action updates a #${id} coop`;
  }

  remove(id: number) {
    return `This action removes a #${id} coop`;
  }
}
