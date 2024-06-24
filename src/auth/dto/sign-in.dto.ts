import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SignInDto {
  @Expose()
  provider: string;

  @Expose()
  token: string;
}
