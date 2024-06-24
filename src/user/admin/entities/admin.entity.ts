import { Column, Entity } from 'typeorm';
import { BaseUserEntity } from '../../entities/base.user.entity';

@Entity()
export class Admin extends BaseUserEntity {
  @Column()
  password: string;
}
