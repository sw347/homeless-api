import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { extractJwt } from './extract.jwt';
import { Request } from 'express';
import { AdminService } from '../../user/admin/admin.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly adminService: AdminService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = extractJwt(request);
    if (token !== null) {
      const payload = await this.authService.verifyAccessToken(token);

      const user =
        payload.role === 'admin'
          ? await this.adminService.findOne(payload.id)
          : await this.userService.findOne(payload.id);

      if (user === null) {
        throw new UnauthorizedException();
      }
      request.user = user;
    }
    return true;
  }
}
