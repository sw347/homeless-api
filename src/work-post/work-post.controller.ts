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
import { plainToInstance } from 'class-transformer';
import { ApplyService } from '../common/apply.service';
import { UserEntity } from '../user/entities/user.entity';

@Controller('work-post')
export class WorkPostController {
  constructor(
    private readonly workPostService: WorkPostService,
    private readonly applyService: ApplyService,
    private readonly taskService: TaskService,
  ) {}

  @Get()
  findAll() {
    return this.workPostService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('my')
  async myApplies(@User() user: UserEntity) {
    return this.applyService.findByUser(user.id, 'work-post');
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = this.workPostService.findOne(id);
    if (data === null) {
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
  @UseGuards(JwtGuard)
  async applies(
    @User() user: Admin,
    @Param('id') id: string,
  ): Promise<ApplyDto[]> {
    return plainToInstance(
      ApplyDto,
      await this.applyService.findAll(id, 'work-post'),
    );
  }

  @UseGuards(JwtGuard)
  @Post(':id/apply')
  async apply(@User() user: UserEntity, @Param('id') id: string) {
    return this.applyService.create(user, id, 'work-post');
  }
}
