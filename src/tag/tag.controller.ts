import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() body: { name: string }) {
    return this.tagService.create(body.name);
  }

  @Get()
  async findAll() {
    return this.tagService.findAll();
  }
}
