import { Exclude, Expose } from "class-transformer";
import { User } from "../../user/entities/user.entity";
import { Post } from "../../post/entities/post.entity";
@Exclude()
export class ApplyDto {
  @Expose()
  user: User;

  @Expose()
  postId: Post;

  @Expose()
  date: Date;

  @Expose()
  title: string;

  @Expose()
  type: string;
}