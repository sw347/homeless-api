import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { Repository } from "typeorm";

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepository: Repository<Post>) {
  }
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: string) {
    return `This action returns a #${id} post`;
  }

  update(id: string) {
    return `This action updates a #${id} post`;
  }

  remove(id: string) {
    return `This action removes a #${id} post`;
  }
}
