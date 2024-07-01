import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { AdminService } from './admin/admin.service';
import { OrgService } from '../org/org.service';
import { UserEntity } from './entities/user.entity';
import { User } from '../common/decorator/user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AdminDto } from './admin/dto/admin.dto';
import { Admin } from './admin/entities/admin.entity';
import { InitUserDto } from './dto/init-user.dto';
import { InitAdminDto } from './admin/dto/init-admin.dto';
import { OrgDto } from '../org/dto/org.dto';
import { OrgUsersDto } from '../org/dto/org-users.dto';
import { IdleDto } from './dto/idle.dto';
import { UserIdleDto } from './dto/user-idle.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
@UseGuards(JwtGuard, RolesGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly orgService: OrgService,
  ) {}

  @Post('temp')
  async forceAddUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get('me')
  async getUserInfo(@User() user: Admin | UserEntity) {
    switch (user.role) {
      case 'admin':
        return plainToInstance(AdminDto, user);
      case 'user':
        return plainToInstance(UserDto, user);
    }
  }

  @Post('me')
  async initUserInfo(
    @User() user: Admin | UserEntity,
    @Body() body: InitAdminDto | InitUserDto,
  ) {
    switch (user.role) {
      case 'admin': {
        const { affected } = await this.adminService.update(user.id, body);
        if (!affected) throw new InternalServerErrorException();

        return plainToInstance(
          AdminDto,
          await this.adminService.findOne(user.id),
        );
      }
      case 'user': {
        const { affected } = await this.userService.update(
          user.id,
          body as InitUserDto,
        );
        if (!affected) throw new InternalServerErrorException();

        return plainToInstance(
          UserDto,
          await this.userService.findOne(user.id),
        );
      }
    }
  }

  @Patch('me')
  async updateUserInfo(
    @User() user: Admin | UserEntity,
    @Body() body: InitAdminDto | InitUserDto,
  ) {
    switch (user.role) {
      case 'admin': {
        const { affected } = await this.adminService.update(user.id, body);
        if (!affected) throw new InternalServerErrorException();

        return plainToInstance(
          AdminDto,
          await this.adminService.findOne(user.id),
        );
      }
      case 'user': {
        const { affected } = await this.userService.update(
          user.id,
          body as InitUserDto,
        );
        if (!affected) throw new InternalServerErrorException();

        return plainToInstance(
          UserDto,
          await this.userService.findOne(user.id),
        );
      }
    }
  }

  @Get('org')
  async getUserOrg(@User() user: Admin | UserEntity) {
    switch (user.role) {
      case 'admin':
        if (user.organization == null) throw new NotFoundException();

        const org = await this.orgService.findOne(user.organization.id);
        const users = await this.userService.getOrgUsers(user.organization.id);
        return plainToInstance(OrgUsersDto, {
          ...org,
          users: users.map<UserIdleDto>((user) => ({
            name: user.name,
            isIdle: user.idleAt != null,
            idleAt: user.idleAt,
          })),
        });
      case 'user':
        if (user.organization === null) throw new NotFoundException();
        return plainToInstance(OrgDto, user.organization);
    }
  }

  @Post('org')
  async updateUserOrg(
    @User() user: Admin | UserEntity,
    @Body() body: { id: string },
  ) {
    const org = await this.orgService.findOne(body.id);
    switch (user.role) {
      case 'admin':
        return this.adminService.update(user.id, { organization: org });
      case 'user':
        return this.userService.update(user.id, { organization: org });
    }
  }

  @Get('idle')
  async getIdle(@User() user: UserEntity): Promise<IdleDto> {
    return {
      isIdle: user.idleAt != null,
      idleAt: user.idleAt,
    };
  }

  @Patch('idle')
  async setIdle(
    @User() user: UserEntity,
    @Body() body: { isIdle: boolean },
  ): Promise<IdleDto> {
    const idleAt = body.isIdle ? new Date() : null;
    const { affected } = await this.userService.update(user.id, { idleAt });
    if (!affected) throw new InternalServerErrorException();
    return {
      isIdle: body.isIdle,
      idleAt,
    };
  }
}
