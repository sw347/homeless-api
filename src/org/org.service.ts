import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Org } from './entities/org.entity';
import { Repository } from 'typeorm';
import { OrgDto } from './dto/org.dto';

@Injectable()
export class OrgService {
  constructor(
    @InjectRepository(Org) private readonly orgRepository: Repository<Org>,
  ) {}

  create(orgDto: OrgDto) {
    const org = this.orgRepository.create(orgDto);
    return this.orgRepository.save(org);
  }

  findAll() {
    return this.orgRepository
      .createQueryBuilder()
      .where('createdAt = (select max(createdAt) from org)')
      .getMany();
  }

  findOne(id: string) {
    return this.orgRepository
      .createQueryBuilder()
      .where('createdAt = (select max(createdAt) from org)')
      .andWhere({ where: { id } })
      .getOne();
  }
}
