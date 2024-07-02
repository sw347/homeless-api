import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}
  create(userId: string, createScheduleDto: CreateScheduleDto) {
    const schedule: Schedule = this.scheduleRepository.create({
      user: { id: userId },
      startDate: new Date(createScheduleDto.startDate),
      endDate: new Date(createScheduleDto.endDate),
      title: createScheduleDto.title,
      description: createScheduleDto.description,
    });
    return this.scheduleRepository.save(schedule);
  }

  findAll() {
    return this.scheduleRepository.find();
  }

  findById(id: string) {
    return this.scheduleRepository.findOne({ where: { id } });
  }

  findByDay(day: Date) {
    return this.scheduleRepository
      .createQueryBuilder()
      .where(`date_format(startDate, '%Y-%m-%d') = :day`, { day })
      .getMany();
  }

  findByMonth(month: number) {
    return this.scheduleRepository
      .createQueryBuilder()
      .where(`date_format(startDate, '%Y%m') = :month`, { month })
      .getMany();
  }

  update(id: string, params: UpdateScheduleDto) {
    return this.scheduleRepository.update(id, params);
  }

  async remove(id: string) {
    const schedule = await this.findById(id);
    return this.scheduleRepository.remove(schedule);
  }
}
