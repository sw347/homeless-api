import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

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
