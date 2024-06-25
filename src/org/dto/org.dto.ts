import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OrgDto {
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
  description: string;

  @Expose()
  phone: string;

  @Expose()
  baseUrl: string;

  @Expose()
  mainImage: string;

  @Expose()
  subImages: string[];
}
