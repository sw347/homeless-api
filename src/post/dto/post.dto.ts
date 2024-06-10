import { Exclude, Expose } from "class-transformer";
import { TagDto } from "../../tag/dto/tag.dto";
import { User } from "../../user/entities/user.entity";

@Exclude()
export class PostDto {
  @Expose()
  user: User;

  @Expose()
  title: string;

  @Expose()
  subtitle: string;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  description: string;

  @Expose()
  images: string[];

  @Expose()
  tags: TagDto[];
}