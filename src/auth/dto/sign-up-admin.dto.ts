import { SignInAdminDto } from './sign-in-admin.dto';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class SignUpAdminDto extends SignInAdminDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}
