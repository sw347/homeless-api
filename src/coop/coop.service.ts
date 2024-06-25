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
    return this.coopRepository
      .createQueryBuilder()
      .where('createdAt = (select max(createdAt) from coop)')
      .getMany();
  }

  findOne(id: string) {
    return this.coopRepository
      .createQueryBuilder()
      .where('createdAt = (select max(createdAt) from coop)')
      .andWhere({ id })
      .getOne();
  }
}
