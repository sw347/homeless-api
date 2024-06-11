import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  async findOne(@Req() req) {
    return plainToInstance(UserDto, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}

/**
 *
 * UserController
 *  GET   /user (header: token) -> user findOne()
 *  POST  /user (header: token) -> user update() first
 *    body: {
 *      name, email, organization, rule, tags
 *    }
 *  PATCH /user (header: token) -> user update()
 *    body: {
 *      tags, idle (update idleAt: Date)
 *    }
 *
 * UserService
 *  create()
 *  findOne()
 *  setup()
 *  update()
 *  ...elasticFunctions
 *
 * AuthController
 *  GET /auth/login/naver (body: token)
 *  GET /auth/login/kakao (body: token)
 *  GET /auth/callback/kakao
 *
 * AuthService
 *  login()
 *  get (kakao, naver) userInfo()
 *  createAccessToken() //jwt
 *
 */
