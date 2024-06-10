import { Controller, Get, Post, Patch, Param, Delete, Query } from "@nestjs/common";
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {

  }

  @Post('id')
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

  @Patch('update/:id/:postId')
  update(@Param('id') id: string, @Param('postId') postId: string) {
    return this.postService.update(id);
  }

  @Delete('delete/:id/:postId')
  remove(@Param('id') id: string, @Param('postId') postId: string) {
    return this.postService.remove(id);
  }
}