import { Exclude, Expose } from 'class-transformer';
import { OrgDto } from '../../../org/dto/org.dto';

@Exclude()
export class AdminDto {
  @Expose()
  name?: string;

  @Expose()
  email?: string;

  @Expose()
  organization?: OrgDto;

  @Expose()
  phone?: string;

  @Expose()
  role: 'admin';
}
