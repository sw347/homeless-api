import {
  Controller,
  Get,
  Post,
  Param,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
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
  async findOne(@Param('id') id: string) {
    const data = this.coopService.findOne(id);
    if (data == null) {
      throw new NotFoundException();
    }
    return data;
  }

  @Post('crawler')
  @HttpCode(204)
  forceRun() {
    this.taskService.everyCoop();
  }
}
