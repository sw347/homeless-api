import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entity/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  create(name: string) {
    const tag = this.tagRepository.create({ name });
    return this.tagRepository.save(tag);
  }

  findAll() {
    return this.tagRepository.find();
  }

  findOne(id: string) {
    return this.tagRepository.findOne({ where: { id } });
  }

  findByName(name: string) {
    return this.tagRepository.findOne({ where: { name } });
  }
}
