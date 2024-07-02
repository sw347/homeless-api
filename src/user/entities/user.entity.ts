import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Tag } from '../../tag/entity/tag.entity';
import { BaseUserEntity } from './base.user.entity';

@Entity('user')
export class UserEntity extends BaseUserEntity {
  @Column({ nullable: true })
  oauthId: string;

  @Column({ type: 'timestamp', nullable: true })
  idleAt?: Date;

  @Column('simple-array')
  interest: string[];

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @Column({ nullable: true })
  fcmToken: string;
}
