import { Controller, Get, Post, Param, HttpCode } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.workPostService.findOne(+id);
  }

  @Post('crawler')
  @HttpCode(204)
  forceRun() {
    this.taskService.everyWorkPost();
  }
}
