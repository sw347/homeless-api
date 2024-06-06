import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/dto/base.entity';

@Entity()
export class WorkPost extends BaseEntity {
  @Column()
  id: number;

  @Column()
  title: string;

  @Column()
  state: string;

  @Column({ type: 'text', nullable: true })
  webView: string;

  @Column({ type: 'timestamp' })
  addDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate?: Date;

  @Column()
  companyName: string;

  @Column({ nullable: true })
  recruitment?: string;

  @Column()
  companyLocation?: string;

  @Column()
  companyJobType?: string;

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

  @Column('text', { nullable: true })
  otherInfo?: string;
}
