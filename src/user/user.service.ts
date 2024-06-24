import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
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
    return this.userRepository.findOne({ where: { id } });
  }

  findByOAuthId(id: string | number, provider: string) {
    return this.userRepository.findOne({
      where: { oauthId: `${provider}:${id}` },
    });
  }

  getOrgUsers(id: string) {
    return this.userRepository.find({
      where: { organization: { id } },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }
}
