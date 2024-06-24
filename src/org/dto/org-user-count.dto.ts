import { OrgDto } from './org.dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OrgUserCountDto extends OrgDto {
  @Expose()
  userCount: number;
}
