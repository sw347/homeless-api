import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepository: Repository<Post>) {

  }
  create(createPostDto: CreatePostDto, user: User) {
    const post = this.postRepository.create({
      ...createPostDto,
      user: user
    })
    return this.postRepository.save(post);
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: string) {
    return this.postRepository.findOne({where: {uuid: id}});
  }

  update(id: string, params: UpdatePostDto) {
    return this.postRepository.update(id, params);
  }

  async remove(id: string) {
    const post = await this.findOne(id);
    return this.postRepository.remove(post);
  }
}
