import {
  Controller,
  Get,
  Post,
  Param,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { WorkPostService } from './work-post.service';
import { TaskService } from '../task/task.service';

@Controller('work-post')
export class WorkPostController {
  constructor(
    private readonly workPostService: WorkPostService,
    private readonly taskService: TaskService,
  ) {}

  @Get()
  findAll() {
    return this.workPostService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = this.workPostService.findOne(id);
    if (data == null) {
      return new NotFoundException();
    }
    return data;
  }

  @Post('crawler')
  @HttpCode(204)
  forceRun() {
    this.taskService.everyWorkPost();
  }
}
