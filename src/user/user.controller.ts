import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TagDto } from "../tag/tag.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Param() token: string) {
    return this.userService.create(token);
  }

  @Get()
  findOne(@Param() token: string) {
    return this.userService.findOne(token);
  }

  @Patch()
  update(@Param() token: string, @Body() tags: TagDto) {
    return this.userService.update(token, tags);
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
