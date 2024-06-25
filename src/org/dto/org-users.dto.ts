import { UserIdleDto } from '../../user/dto/user-idle.dto';
import { Exclude, Expose } from 'class-transformer';
import { OrgDto } from './org.dto';

@Exclude()
export class OrgUsersDto extends OrgDto {
  @Expose()
  users: UserIdleDto[];
}
