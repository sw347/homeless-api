import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { BaseEntity } from "../../common/dto/base.entity";
import { Tag } from "../../tag/entity/tag.entity";

@Entity()
export class Post extends BaseEntity {
  @ManyToOne(()=>User)
  @Column()
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

  @Column()
  images: string[];

  @ManyToMany(()=>Tag)
  @Column()
  tags: Tag[];
}