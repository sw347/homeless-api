import { Org } from '../../org/entities/org.entity';

export class UpdateBaseUserDto {
  phone: string;
  organization: string | Org;
}
