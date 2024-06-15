import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from "@nestjs/common";
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { JwtGuard } from "../auth/jwt.guard";

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() body: CreateScheduleDto) {
    return this.scheduleService.create(body);
  }

  @Get()
  search(@Query('day') day?: Date, @Query('month') month?: number) {
    if (day != null) return this.scheduleService.findByDay(day);
    if (month != null) return this.scheduleService.findByMonth(month);
  }

  @Get('/all')
  findAll() {
    return this.scheduleService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(id);
  }
}
