import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity({
  name: 'id_card',
})
export class IdCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '身份证号',
  })
  cardName: string;

  // 给 user_id 列添加一个外建约束，引用 user 表的 id 列。
  // 设置级联关系
  @JoinColumn()
  @OneToOne(() => User, {
    // cascade: true, 这个 cascade 不是数据库的那个级联，而是告诉 typeorm 当你增删改一个 Entity 的时候，是否级联增删改它关联的 Entity。
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  user: User;
}
