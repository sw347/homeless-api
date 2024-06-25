import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Coop extends BaseEntity {
  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  location: string;

  @Column({ type: 'double', nullable: true })
  lat: number;

  @Column({ type: 'double', nullable: true })
  lng: number;

  @Column()
  phone: string;
}
