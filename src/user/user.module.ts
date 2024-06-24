import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AdminService } from './admin/admin.service';
import { Admin } from './admin/entities/admin.entity';
import { Tag } from '../tag/entity/tag.entity';
import { OrgModule } from '../org/org.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, Admin, Tag]),
    forwardRef(() => OrgModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, AdminService],
  exports: [UserService, AdminService],
})
export class UserModule {}
