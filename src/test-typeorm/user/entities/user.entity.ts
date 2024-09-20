import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'aaa_user',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    // 数据库存的字段
    name: 'aaa_name',
    length: 50,
  })
  // 实际接口要使用的字段
  name: string;
}
