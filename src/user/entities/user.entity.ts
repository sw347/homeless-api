import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  organization: string;

  @Column()
  phone: string;

  @Column({type: 'timestamp'})
  birth: Date;

  @Column()
  role: string;

  @Column()
  idle: string;

  @Column('simple-array')
  interest: string[];
}
