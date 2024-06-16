import { Injectable } from '@nestjs/common';
import { CreateApplyDto } from './dto/create-apply.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Apply } from "./entities/apply.entity";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { Post } from "../post/entities/post.entity";

@Injectable()
export class ApplyService {
  constructor(@InjectRepository(Apply) private applyRepository: Repository<Apply>) {
  }
  create(createApplyDto: CreateApplyDto, user: User, post: Post) {
    const apply = this.applyRepository.create({
      ...createApplyDto,
      post,
      user,
    })
    return this.applyRepository.save(apply);
  }

  async remove(post: Post, user: User) {
    const apply = await this.applyRepository.findOne({where: {post, user}});
    return this.applyRepository.remove(apply);
  }
}
