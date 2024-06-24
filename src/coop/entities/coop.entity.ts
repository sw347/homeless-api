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
  lat?: number;

  @Column({ type: 'double', nullable: true })
  lng?: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column()
  phone: string;

  @Column({ type: 'text', nullable: true })
  baseUrl: string;

  @Column({ type: 'text', nullable: true })
  mainImage: string;

  @Column('simple-array')
  subImages: string[];
}
