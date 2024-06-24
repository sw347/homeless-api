import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OrgDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  phone: string;
  @Expose()
  location: string;
  @Expose()
  lat: number;
  @Expose()
  lng: number;
}
