import { Injectable } from '@nestjs/common';
import { CreateWorkPostDto } from './dto/create-work-post.dto';
import { UpdateWorkPostDto } from './dto/update-work-post.dto';
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
    return this.workPostRepository.find();
  }

  findOne(id: number) {
    return this.workPostRepository.findOne({ where: { id: id } });
  }
}
