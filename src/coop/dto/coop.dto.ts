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
  realLocation?: LatLngDto;

  @Expose()
  description?: string;

  @Expose()
  phone: string;

  @Expose()
  baseUrl: string;

  @Expose()
  mainImage: string;

  @Expose()
  subImages?: string[];
}

@Exclude()
export class LatLngDto {
  @Expose()
  lat: number;

  @Expose()
  lng: number;
}
