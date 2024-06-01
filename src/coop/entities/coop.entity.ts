import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  realLocation?: string;

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
