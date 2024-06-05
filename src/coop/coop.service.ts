import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coop } from './entities/coop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoopService {
  constructor(
    @InjectRepository(Coop) private coopRepository: Repository<Coop>,
  ) {}
  findAll() {
    return this.coopRepository.find();
  }

  findOne(id: string) {
    return this.coopRepository.findOne({ where: { uuid: id } });
  }
}
