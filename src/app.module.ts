import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoopModule } from './coop/coop.module';
import { WorkPostModule } from './work-post/work-post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

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
      synchronize: false,
      logging: true,
    }),
    CoopModule,
    WorkPostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
