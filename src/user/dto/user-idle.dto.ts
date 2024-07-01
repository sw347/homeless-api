import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserIdleDto {
  @Expose()
  name: string;
  @Expose()
  isIdle: boolean;
  @Expose()
  idleAt: Date;
}
