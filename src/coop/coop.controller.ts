import { Controller, Get, Post, Param, HttpCode } from '@nestjs/common';
import { CoopService } from './coop.service';
import { TaskService } from '../task/task.service';

@Controller('coop')
export class CoopController {
  constructor(
    private readonly coopService: CoopService,
    private readonly taskService: TaskService,
  ) {}

  @Get()
  findAll() {
    return this.coopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coopService.findOne(id);
  }

  @Post('crawler')
  @HttpCode(204)
  forceRun() {
    this.taskService.everyCoop();
  }
}
