import { LatLngDto } from '../../common/dto/lat-lng.dto';
import { IsArray, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class CrawlerOrgDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  location: string;

  @Type(() => LatLngDto)
  realLocation: LatLngDto;

  @IsString()
  description: string;

  @IsPhoneNumber()
  phone: string;

  @IsUrl()
  baseUrl: string;

  @IsUrl()
  mainImage: string;

  @IsArray()
  @IsUrl({}, { each: true })
  subImages?: string[];
}
