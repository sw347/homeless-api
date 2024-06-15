import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { BaseEntity } from "../../common/dto/base.entity";

@Entity()
export class Schedule extends BaseEntity {
  @ManyToOne(()=>User)
  id: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  title: string;

  @Column()
  description: string;
}
