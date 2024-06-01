import { Injectable } from '@nestjs/common';
import { CreateWorkPostDto } from './dto/create-work-post.dto';
import { UpdateWorkPostDto } from './dto/update-work-post.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { WorkPost } from "./entities/work-post.entity";
import { Repository } from "typeorm";

@Injectable()
export class WorkPostService {
  constructor(
    @InjectRepository(WorkPost) private workPostRepository: Repository<WorkPost>
  ) {}

  create(createWorkPostDto: CreateWorkPostDto) {
    return 'This action adds a new workPost';
  }

  findAll() {
    return `This action returns all workPost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workPost`;
  }

  update(id: number, updateWorkPostDto: UpdateWorkPostDto) {
    return `This action updates a #${id} workPost`;
  }

  remove(id: number) {
    return `This action removes a #${id} workPost`;
  }
}
