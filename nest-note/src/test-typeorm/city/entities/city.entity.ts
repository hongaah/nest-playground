import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';

/**
 * 树形结构存储模式
 *
 * Tree 参数可以指定 4 中存储模式：
 * - 闭包表 closure-table
 *   生成两个表 city 和 city_closure
 *   在 city 表里保存着 city 记录之间的父子关系，通过 parentId 关联。
 *   在 city_closure 表里记录了也记录了父子关系。
 * - 材料化路径 materialized-path
 *   生成 city表，多了一个 mpath 字段，通过 mpath 路径存储了当前节点的访问路径，从而实现了父子关系的记录
 * - 邻接列表（Adjacency list）无法一次加载大型树
 * - 嵌套集合（Nested set）嵌套集合中不能有多个根
 *
 */
@Entity()
// @Tree('closure-table')
@Tree('materialized-path')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  status: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @Column()
  name: string;

  // 通过 @TreeChildren 声明的属性里存储着它的 children 节点
  @TreeChildren()
  children: City[];

  // 通过 @TreeParent 声明的属性里存储着它的 parent 节点。
  @TreeParent()
  parent: City;
}
