import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/dto/base.entity';

@Entity()
export class Tag extends BaseEntity {
  @Column()
  name: string;

  @Column()
  image: string;
}
