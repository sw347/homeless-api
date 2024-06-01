import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  realLocation?: string;

  @Column('text')
  description: string;

  @Column()
  phone: string;

  @Column()
  baseUrl: string;

  @Column()
  mainImage: string;

  @Column('simple-array')
  subImages: string[];
}
