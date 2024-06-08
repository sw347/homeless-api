import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "../../tag/tag.dto";

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column()
  tags: Tag[];
}

// user(fk) if role is admin