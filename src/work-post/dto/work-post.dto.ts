import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class WorkPostDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  state: string;

  @Expose()
  webView: string;

  @Expose()
  addDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  companyName: string;

  @Expose()
  companyLocation: string;

  @Expose()
  companyJobType: string;

  @Expose()
  findJobType: string;

  @Expose()
  personnel: string;

  @Expose()
  pay: string;

  @Expose()
  workingHours: string;

  @Expose()
  welfare?: string;

  @Expose()
  workingLocation: string;

  @Expose()
  otherInfo: string;
}
