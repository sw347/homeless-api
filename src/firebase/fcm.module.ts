import { Module } from '@nestjs/common';
import { FcmService } from './fcm.service';
import { FcmController } from './fcm.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [HttpModule, AuthModule, UserModule],
  controllers: [FcmController],
  providers: [FcmService],
  exports: [FcmService],
})
export class FcmModule {}
