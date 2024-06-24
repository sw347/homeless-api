import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Schedule extends BaseEntity {
  @ManyToOne(() => UserEntity)
  userId: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  title: string;

  @Column()
  description: string;
}
