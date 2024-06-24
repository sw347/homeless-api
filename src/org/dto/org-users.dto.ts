import { UserIdleDto } from '../../user/dto/user-idle.dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OrgUsersDto {
  @Expose()
  users: UserIdleDto[];
}
