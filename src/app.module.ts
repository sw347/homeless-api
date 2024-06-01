import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoopModule } from './coop/coop.module';

@Module({
  imports: [CoopModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
