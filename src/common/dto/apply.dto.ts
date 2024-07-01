import {
  Exclude,
  Expose,
  plainToInstance,
  Transform,
  Type,
} from 'class-transformer';
import { UserIdleDto } from '../../user/dto/user-idle.dto';
import { PostDto } from '../../post/dto/post.dto';
import { WorkPostDto } from '../../work-post/dto/work-post.dto';

@Exclude()
export class ApplyDto {
  @Expose()
  @Type(() => UserIdleDto)
  user: UserIdleDto;

  @Expose()
  @Transform(({ value, obj }) => {
    switch (obj.type) {
      case 'post':
        return plainToInstance(PostDto, value);
      case 'work-post':
        return plainToInstance(WorkPostDto, value);
    }
  })
  post: PostDto | WorkPostDto;

  @Expose()
  type!: 'post' | 'work-post';

  @Expose()
  createdAt: Date;
}
