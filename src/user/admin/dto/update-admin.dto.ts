import { UpdateBaseUserDto } from '../../dto/update-base-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAdminDto extends PartialType(UpdateBaseUserDto) {}
