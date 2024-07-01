import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Tag } from '../tag/entity/tag.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ApplyService } from '../common/apply.service';
import { Apply } from '../common/entities/apply.entity';
import { WorkPost } from '../work-post/entities/work-post.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Tag, Apply, WorkPost]),
    AuthModule,
    UserModule,
  ],
  controllers: [PostController],
  providers: [PostService, ApplyService],
})
export class PostModule {}
