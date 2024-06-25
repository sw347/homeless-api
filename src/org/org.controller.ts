import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrgService } from './org.service';
import { plainToInstance } from 'class-transformer';
import { OrgDto } from './dto/org.dto';
import { User } from '../common/decorator/user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { Admin } from '../user/admin/entities/admin.entity';
import { UserService } from '../user/user.service';
import { OrgUserCountDto } from './dto/org-user-count.dto';
import { TaskService } from '../task/task.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('org')
export class OrgController {
  constructor(
    private readonly orgService: OrgService,
    private readonly userService: UserService,
    private readonly taskService: TaskService,
  ) {}

  @Get()
  async findAll() {
    return plainToInstance(OrgDto, await this.orgService.findAll());
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async findOne(@User() user: Admin | UserEntity, @Param('id') id: string) {
    switch (user.role) {
      case 'admin': {
        const org = await this.orgService.findOne(id);
        const users = await this.userService.getOrgUsers(id);
        return plainToInstance(OrgUserCountDto, {
          ...org,
          userCount: users.length,
        });
      }
      case 'user':
        return plainToInstance(OrgDto, await this.orgService.findOne(id));
    }
  }

  @Post('crawler')
  @HttpCode(204)
  forceRun() {
    this.taskService.everyOrg();
  }
}
