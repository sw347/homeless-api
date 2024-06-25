import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity()
export class Apply {
  @ManyToOne(() => UserEntity, { primary: true })
  @JoinColumn()
  user: UserEntity;

  @PrimaryColumn()
  postId: string;

  @Column()
  type: 'post' | 'work-post';

  @CreateDateColumn()
  createdAt: Date;
}
