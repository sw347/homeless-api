import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Org extends BaseEntity {
  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  location: string;

  @Column()
  lat: number;

  @Column()
  lng: number;
}
