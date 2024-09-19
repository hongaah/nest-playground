import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// 默认的映射关系：主键为 INT 自增、firstName 和 lastName 是 VARCHAR(255)，age 是 INT。
@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
