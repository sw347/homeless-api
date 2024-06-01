import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coop } from '../coop/entities/coop.entity';
import { WorkPost } from '../work-post/entities/work-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coop, WorkPost]), HttpModule],
  providers: [TaskService],
})
export class TaskModule {}
