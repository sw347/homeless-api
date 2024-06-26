import { UpdateBaseUserDto } from './update-base-user.dto';

export class UpdateUserDto extends UpdateBaseUserDto {
  idleAt: Date;
  interest: string[];
  tags: string[];
}
