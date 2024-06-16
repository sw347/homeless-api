import { Module } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { ApplyController } from './apply.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Apply } from "./entities/apply.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Apply])],
  controllers: [ApplyController],
  providers: [ApplyService],
})
export class ApplyModule {}
