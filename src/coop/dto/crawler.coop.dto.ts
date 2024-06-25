import { LatLngDto } from '../../common/dto/lat-lng.dto';
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CrawlerCoopDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  location: string;

  @Type(() => LatLngDto)
  realLocation: LatLngDto;

  @IsString()
  phone: string;
}
