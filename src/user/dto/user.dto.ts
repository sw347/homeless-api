import { Exclude, Expose, Type } from 'class-transformer';
import { TagDto } from '../../tag/dto/tag.dto';
import { OrgDto } from '../../org/dto/org.dto';

@Exclude()
export class UserDto {
  @Expose()
  name?: string;

  @Expose()
  email?: string;

  @Expose()
  @Type(() => OrgDto)
  organization?: OrgDto;

  @Expose()
  phone?: string;

  @Expose()
  role: string;

  @Expose()
  idleAt?: Date;

  @Expose()
  interest: string[];

  @Expose()
  @Type(() => TagDto)
  tags: TagDto[];
}
