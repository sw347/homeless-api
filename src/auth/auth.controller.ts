import { Controller, Get, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async login(@Body() body: LoginDto) {
    const user = await this.authService.getOAuthUserData(
      body.provider,
      body.token,
    );

    if (user == null) {
      throw new UnauthorizedException();
    }

    return await this.authService.login(user);
  }
}
