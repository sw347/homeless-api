import { IsEmail, IsString } from 'class-validator';

export class SignInAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
