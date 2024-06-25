import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coop } from '../coop/entities/coop.entity';
import { WorkPost } from '../work-post/entities/work-post.entity';
import { Org } from '../org/entities/org.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coop, WorkPost, Org]), HttpModule],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
