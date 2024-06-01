import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoopModule } from './coop/coop.module';
import { WorkPostModule } from './work-post/work-post.module';

@Module({
  imports: [CoopModule, WorkPostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
