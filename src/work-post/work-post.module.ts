import { Module } from '@nestjs/common';
import { WorkPostService } from './work-post.service';
import { WorkPostController } from './work-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkPost } from './entities/work-post.entity';
import { TaskModule } from '../task/task.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ApplyService } from '../common/apply.service';
import { Apply } from '../common/entities/apply.entity';
import { Post } from '../post/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkPost, Apply, Post]),
    TaskModule,
    AuthModule,
    UserModule,
  ],
  controllers: [WorkPostController],
  providers: [WorkPostService, ApplyService],
})
export class WorkPostModule {}
