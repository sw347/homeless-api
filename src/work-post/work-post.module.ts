import { Module } from '@nestjs/common';
import { WorkPostService } from './work-post.service';
import { WorkPostController } from './work-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkPost } from './entities/work-post.entity';
import { TaskModule } from '../task/task.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkPost]),
    TaskModule,
    AuthModule,
    UserModule,
  ],
  controllers: [WorkPostController],
  providers: [WorkPostService],
})
export class WorkPostModule {}
