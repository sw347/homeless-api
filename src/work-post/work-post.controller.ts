import {
  Controller,
  Get,
  Post,
  Param,
  HttpCode,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { WorkPostService } from './work-post.service';
import { TaskService } from '../task/task.service';
import { ApplyDto } from '../common/dto/apply.dto';
import { Admin } from '../user/admin/entities/admin.entity';
import { Roles } from '../common/decorator/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { User } from '../common/decorator/user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('work-post')
export class WorkPostController {
  constructor(
    private readonly workPostService: WorkPostService,
    private readonly taskService: TaskService,
  ) {}

  @Get()
  findAll() {
    return this.workPostService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = this.workPostService.findOne(id);
    if (data == null) {
      return new NotFoundException();
    }
    return data;
  }

  @Post('crawler')
  @HttpCode(204)
  forceRun() {
    this.taskService.everyWorkPost();
  }

  @Get(':id/applies')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async applies(
    @User() user: Admin,
    @Param('id') id: string,
  ): Promise<ApplyDto[]> {
    return [];
  }
}
