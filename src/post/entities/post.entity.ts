import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '../../common/dto/base.entity';
import { Tag } from '../../tag/entity/tag.entity';

@Entity()
export class Post extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  description: string;

  @Column({ type: 'simple-array' })
  images: string[];

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
