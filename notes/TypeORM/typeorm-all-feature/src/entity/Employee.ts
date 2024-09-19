import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Department } from './Department';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  // 一对多的关系只可能是在多的那一方保存外键，所以这里可以省略 @JoinColumn
  @JoinColumn({
    name: 'department_id',
  })
  @ManyToOne(() => Department, {
    // cascade: true,
    // 如果设置了 onDelete 为 SET NULL 或者 CASCADE，就不用手动删 employee 了，只要删了 department，mysql 会自动把关联的 employee 记录删除，或者是把它们的外键 id 置为空。
    onDelete: 'CASCADE',
  })
  department: Department;
}
