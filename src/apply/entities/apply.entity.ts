import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Post } from "../../post/entities/post.entity";

@Entity()
export class Apply {
  @PrimaryColumn()
  @ManyToOne(() => User)
  user: User;

  @PrimaryColumn()
  @ManyToOne(() => Post)
  post: Post;

  @Column()
  date: Date;

  @Column()
  title: string;

  @Column()
  type: string;
}