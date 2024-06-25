import { Exclude, Expose } from 'class-transformer';
import { UserIdleDto } from '../../user/dto/user-idle.dto';
import { PostDto } from '../../post/dto/post.dto';
import { WorkPostDto } from '../../work-post/dto/work-post.dto';

@Exclude()
export class ApplyDto {
  @Expose()
  user: UserIdleDto;

  @Expose()
  post: PostDto | WorkPostDto;

  @Expose()
  type: 'post' | 'work-post';

  @Expose()
  createdAt: Date;
}
