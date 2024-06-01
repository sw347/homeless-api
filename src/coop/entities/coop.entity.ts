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

  @Column()
  description: string;

  @Column()
  phone: string;

  @Column()
  baseUrl: string;

  @Column()
  mainImage: string;

  @Column()
  subImages: string[];
}


// name: string
// location: string
// realLocation: null
// description: string
// phone: string
// baseUrl: string (url)
// mainImage: string (url)
// subImages: string[] (url[])