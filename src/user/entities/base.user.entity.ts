import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Org } from '../../org/entities/org.entity';

@Entity()
export class BaseUserEntity extends BaseEntity {
  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @ManyToOne(() => Org, { nullable: true })
  @JoinColumn({ name: 'orgUuid' })
  organization: Org;

  @Column({ nullable: true })
  phone: string;

  @Column()
  role: 'admin' | 'user';
}
