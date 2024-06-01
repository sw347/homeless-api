import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkPostModule } from './work-post/work-post.module';

@Module({
  imports: [WorkPostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
