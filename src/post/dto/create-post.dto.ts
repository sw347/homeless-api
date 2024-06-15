import { TagDto } from "../../tag/dto/tag.dto";

export class CreatePostDto {
  title: string;
  subtitle: string;
  startDate: Date;
  endDate: Date;
  description: string;
  images: string[];
  tags: TagDto[];
}
