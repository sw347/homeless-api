import { Exclude, Expose } from "class-transformer";
import { TagDto } from "../../tag/tag.dto";

@Exclude()
export class UserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  organization: string;

  @Expose()
  phone: string;

  @Expose()
  birth: Date;

  @Expose()
  rule: string;

  @Expose()
  idle: string;

  @Expose()
  idleAt: Date;

  @Expose()
  tags: TagDto;

}