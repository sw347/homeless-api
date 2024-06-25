import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkPost } from './entities/work-post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkPostService {
  constructor(
    @InjectRepository(WorkPost)
    private workPostRepository: Repository<WorkPost>,
  ) {}

  findAll() {
    return this.workPostRepository
      .createQueryBuilder()
      .where('createdAt = (select max(createdAt) from work_post)')
      .getMany();
  }

  findOne(id: string) {
    return this.workPostRepository
      .createQueryBuilder()
      .where('createdAt = (select max(createdAt) from work_post)')
      .andWhere({ uuid: id })
      .getOne();
  }
}
