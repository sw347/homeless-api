import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { TagDto } from "../tag/tag.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
  }

  create(token: string) {

  }

  findOne(token: string) {
    return `This action returns a #${token} user`;
  }

  update(token: string , tags: TagDto) {
    return `This action updates a #${tags.id} user`;
  }

  setup(id: number) {
    return `This action removes a #${id} user`;
  }
}
