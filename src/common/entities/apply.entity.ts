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
  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @PrimaryColumn()
  postId: string;

  @Column()
  type: 'post' | 'work-post';

  @CreateDateColumn()
  createdAt: Date;
}
