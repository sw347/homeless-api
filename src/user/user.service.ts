import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const { id, provider, ...data } = createUserDto;
    const user = this.userRepository.create({
      oauthId: `${provider}:${id}`,
      ...data,
      role: 'user',
      interest: [],
    });
    return this.userRepository.save(user);
  }

  findOne(id: string) {
    return this.userRepository.findOne({ where: { uuid: id } });
  }

  findByOAuthId(id: string, provider: string) {
    return this.userRepository.findOne({
      where: { oauthId: `${provider}:${id}` },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {}
}
