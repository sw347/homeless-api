import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginDto {
  @Expose()
  provider: string;

  @Expose()
  token: string;
}
