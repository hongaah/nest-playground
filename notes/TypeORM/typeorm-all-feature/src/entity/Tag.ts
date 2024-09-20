import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from './Article';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  // 添加文章的引用
  // 第二个参数说明外键是 Article Entity 的 tags 属性
  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
