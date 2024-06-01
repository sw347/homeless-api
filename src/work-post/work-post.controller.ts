import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkPostService } from './work-post.service';
import { CreateWorkPostDto } from './dto/create-work-post.dto';
import { UpdateWorkPostDto } from './dto/update-work-post.dto';

@Controller('work-post')
export class WorkPostController {
  constructor(private readonly workPostService: WorkPostService) {}

  @Get()
  findAll() {
    return this.workPostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workPostService.findOne(+id);
  }
}
