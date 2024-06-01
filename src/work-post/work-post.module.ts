import { Module } from '@nestjs/common';
import { WorkPostService } from './work-post.service';
import { WorkPostController } from './work-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkPost } from './entities/work-post.entity';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkPost]), TaskModule],
  controllers: [WorkPostController],
  providers: [WorkPostService],
})
export class WorkPostModule {}
