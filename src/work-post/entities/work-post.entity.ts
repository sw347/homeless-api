import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class WorkPost {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  state: string;

  @Column()
  webView: string;

  @Column({ type: 'timestamp' })
  addDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column()
  companyName: string;

  @Column()
  recruitment?: string;

  @Column()
  companyLocation: string;

  @Column()
  companyJobType: string;

  @Column()
  findJobType: string;

  @Column()
  personnel: string;

  @Column()
  pay: string;

  @Column()
  workingHours: string;

  @Column()
  welfare?: string;

  @Column()
  workingLocation: string;

  @Column()
  otherInfo: string;
}
