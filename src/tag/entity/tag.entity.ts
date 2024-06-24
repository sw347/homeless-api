import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;
}
