import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CoopDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  type: string;

  @Expose()
  location: string;

  @Expose()
  lat: number;

  @Expose()
  lng: number;

  @Expose()
  phone: string;
}
