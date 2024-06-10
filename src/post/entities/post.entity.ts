import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { TagDto } from "../../tag/dto/tag.dto";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Post {
  @ManyToMany(()=>User)
  @Column()
  user: User;

  @Column()
  post: string;

  @Column()
  title: string;

  @Column()
  subTitle: string;


  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  description: string;

  @Column()
  images: string[];

  @ManyToMany(()=>TagDto)
  @Column()
  tags: TagDto[];
}

// user(fk) if role is admin