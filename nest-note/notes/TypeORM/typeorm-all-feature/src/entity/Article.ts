import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Tag } from './Tag';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    comment: '文章标题',
  })
  title: string;

  @Column({
    type: 'text',
    comment: '文章内容',
  })
  content: string;

  // 多对多，生成中间表 article_tags_tag，并且 article_tags_tag 还有 2 个外键分别引用着两个表。
  @JoinTable({
    name: 'article_tags_tag',
  })
  // 第二个参数说明外键是 Tag Entity 的 articles 属性。因为当前 Entity 是不包含外键的那一方，所以需要手动指定通过哪个外键列来找当前 Entity。
  @ManyToMany(() => Tag, (tag) => tag.articles)
  tags: Tag[];
}
