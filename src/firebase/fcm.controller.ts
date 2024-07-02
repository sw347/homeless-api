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
      'clKEWj3WSC-M14OFLZdIhs:APA91bHZYVf0rmckcKcIzcLFaSgk1yXvpxMvZ61nnokeoSFMdQD4Vpw-jFV2WcQcEDUt-0W6zaqbWvDVnVO62IelO1jD_NPA38O7GA-hxNb30CbDb4IOChzG4OAR9TCVWOaqAUctSaZE';
    return this.fcmService.apply(token, body.title, body.message);
  }
}
