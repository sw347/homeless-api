import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { PostDto } from './post.dto';
import { Expose } from "class-transformer";
export class UpdatePostDto extends PartialType(CreatePostDto) {

}
