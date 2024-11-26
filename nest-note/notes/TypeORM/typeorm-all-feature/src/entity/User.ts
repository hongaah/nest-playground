import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { IdCard } from './IdCard';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  // 实现在 user 里也可以访问 idCard，第二个参数说明外键是 idCard Entity 的 user 属性。
  @OneToOne(() => IdCard, (idCard) => idCard.user)
  idCard: IdCard;
}
