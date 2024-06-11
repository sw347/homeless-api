import { Exclude, Expose } from 'class-transformer';
import { TagDto } from '../../tag/dto/tag.dto';
import { UserDto } from '../../user/dto/user.dto';

@Exclude()
export class PostDto {
  @Expose()
  user: UserDto;

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
