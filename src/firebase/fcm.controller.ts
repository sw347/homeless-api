import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FcmService } from './fcm.service';
import { User } from '../common/decorator/user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { HttpService } from '@nestjs/axios';

@Controller('fcm')
export class FcmController {
  constructor(private readonly fcmService: FcmService) {}

  @Post()
  async send(@Body() body: { title: string; message: string }) {
    const token =
      'cQF6338ITySHTSvC89guDt:APA91bFKa0souHX7W8Q9L0mbJUbsQzvje_ey094Mjm-xCBlELRPC0ExhyVTgUPOwj7xdtPnZ3gt3VDznXC_7WpnqIPngHuzRwDK7_8J3SKqoIIPQrYUAybqvWoO_-FC4rWjqQN2WZNlI';
    return this.fcmService.apply(token, body.title, body.message);
  }
}
