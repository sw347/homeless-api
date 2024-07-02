import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Schedule } from './entities/schedule.entity';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() body: CreateScheduleDto) {
    const { startDate, endDate, ...other } =
      await this.scheduleService.create(body);
    return {
      ...other,
      startDate: new Date(startDate.getTime() + 9 * 60 * 60 * 1000),
      endDate: new Date(endDate.getTime() + 9 * 60 * 60 * 1000),
    };
  }

  @Get()
  async search(@Query('day') day?: Date, @Query('month') month?: number) {
    let date: Schedule[];
    if (day != null) date = await this.scheduleService.findByDay(day);
    if (month != null) date = await this.scheduleService.findByMonth(month);

    if (date == null) throw new BadRequestException();
    return date.map((date) => {
      const { startDate, endDate, ...other } = date;
      return {
        ...other,
        startDate: new Date(startDate.getTime() + 9 * 60 * 60 * 1000),
        endDate: new Date(endDate.getTime() + 9 * 60 * 60 * 1000),
      };
    });
  }

  @Get('/all')
  async findAll() {
    const date = await this.scheduleService.findAll();
    return date.map((date) => {
      const { startDate, endDate, ...other } = date;
      return {
        ...other,
        startDate: new Date(startDate.getTime() + 9 * 60 * 60 * 1000),
        endDate: new Date(endDate.getTime() + 9 * 60 * 60 * 1000),
      };
    });
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const { startDate, endDate, ...other } =
      await this.scheduleService.findById(id);
    return {
      ...other,
      startDate: new Date(startDate.getTime() + 9 * 60 * 60 * 1000),
      endDate: new Date(endDate.getTime() + 9 * 60 * 60 * 1000),
    };
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const { startDate, endDate, ...other } =
      await this.scheduleService.remove(id);
    return {
      ...other,
      startDate: new Date(startDate.getTime() + 9 * 60 * 60 * 1000),
      endDate: new Date(endDate.getTime() + 9 * 60 * 60 * 1000),
    };
  }
}
