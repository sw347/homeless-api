import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoopService } from './coop.service';
import { CreateCoopDto } from './dto/create-coop.dto';
import { UpdateCoopDto } from './dto/update-coop.dto';

@Controller('coop')
export class CoopController {
  constructor(private readonly coopService: CoopService) {}

  @Get()
  findAll() {
    return this.coopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coopService.findOne(id);
  }
}
