import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Tag } from '../../tag/entity/tag.entity';
import { BaseEntity } from '../../common/dto/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  oauthId: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  organization?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ type: 'timestamp', nullable: true })
  birth?: Date;

  @Column()
  role: string;

  @Column({ type: 'timestamp', nullable: true })
  idleAt?: Date;

  @Column('simple-array')
  interest: string[];

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
