import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Tag } from '../tag/entity/tag.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag]), AuthModule, UserModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
