import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ScheduleDto {
  @Expose()
  id: string;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  title: string;

  @Expose()
  description: string;
}