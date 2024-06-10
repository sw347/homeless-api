import { Controller, Get, Post, Patch, Param, Delete, Query, Body, NotFoundException } from "@nestjs/common";
import { PostService } from './post.service';
import { UpdatePostDto } from "./dto/update-post.dto";

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {

  }

  @Post(':id')
  create(@Param('id') id: string) {
    return this.postService.create(id);
  }

  @Get()
  findAll() {
    return this.postService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  async update(@Body() body: UpdatePostDto, @Param('id') id: string) {
    const { params } = body;
    const post = await this.postService.findOne(id);
    if(post == null) {
      throw new NotFoundException();
    }

    return await this.postService.update(id, params);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}