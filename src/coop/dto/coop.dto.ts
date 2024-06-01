import { IsUrl } from "class-validator";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class CoopDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  location: string;

  @Expose()
  realLocation?: string;

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
