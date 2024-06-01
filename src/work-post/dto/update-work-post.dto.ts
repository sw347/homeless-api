import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkPostDto } from './create-work-post.dto';

export class UpdateWorkPostDto extends PartialType(CreateWorkPostDto) {}
