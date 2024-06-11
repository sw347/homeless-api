import { Exclude, Expose } from 'class-transformer';
import { TagDto } from '../../tag/dto/tag.dto';

@Exclude()
export class UserDto {
  @Expose()
  name?: string;

  @Expose()
  email?: string;

  @Expose()
  organization?: string;

  @Expose()
  phone?: string;

  @Expose()
  birth?: string;

  @Expose()
  role: string;

  @Expose()
  idleAt?: Date;

  @Expose()
  interest: string[];

  @Expose()
  tags: TagDto[];
}
