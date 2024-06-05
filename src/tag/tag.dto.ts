import { Exclude, Expose } from "class-transformer";

@Exclude()
export class TagDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  image?: string;
}