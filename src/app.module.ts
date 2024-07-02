import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoopModule } from './coop/coop.module';
import { WorkPostModule } from './work-post/work-post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { SchedulesModule } from './schedule/schedule.module';
import { OrgModule } from './org/org.module';
import { LoggingMiddleware } from './common/logging.middleware';
import { FcmModule } from './firebase/fcm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '../**/*.entity.{ts,js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    ScheduleModule.forRoot(),
    TaskModule,
    AuthModule,
    UserModule,
    PostModule,
    CoopModule,
    WorkPostModule,
    SchedulesModule,
    OrgModule,
    FcmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
