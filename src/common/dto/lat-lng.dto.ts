import { Exclude, Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

@Exclude()
export class LatLngDto {
  @Expose()
  @IsNumber()
  lat: number;

  @Expose()
  @IsNumber()
  lng: number;
}
