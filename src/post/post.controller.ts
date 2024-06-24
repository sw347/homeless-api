import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UserEntity } from '../user/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { PostDto } from './dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req: { body: CreatePostDto; user: UserEntity }) {
    return this.postService.create(req.body, req.user);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postService.findOne(id);
    if (post == null) {
      throw new NotFoundException();
    }

    return plainToInstance(PostDto, post);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(@Body() body: UpdatePostDto, @Param('id') id: string) {
    const post = await this.postService.findOne(id);
    if (post == null) {
      throw new NotFoundException();
    }

    return this.postService.update(id, body);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
