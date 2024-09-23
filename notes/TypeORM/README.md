# TypeORM

[basic](./typeorm-all-feature/README.md)
[docs](https://www.typeorm.org/)

## nest & TypeORM

🌰：src\test-typeorm

在 Nest 里集成 test-typeorm 只是对 TyprOrm 的 api 封装了一层。

使用方式是在根模块 TypeOrmModule.forRoot 传入数据源配置。然后就可以在各处注入 DataSource、EntityManager 来做增删改查了。如果想用 Repository 来简化操作，还可以在用到的模块引入 TypeOrmModule.forFeature 的动态模块，传入 Entity，会返回对应的 Repository。这样就可以在模块内注入该 Repository 来用了。

原理是 TypeOrmModule.forRoot 对应的动态模块是全局的，导出了 dataSource、entityManager，所以才可以到处注入。而 TypeOrmModule.forFeature 则会根据把传入 Entity 对应的 Repository 导出，这样就可以在模块内注入了。

## 多层级关系 & 树形实体

[TypeORM 树实体](https://www.typeorm.org/tree-entities)

🌰：src\test-typeorm\city

基于 TyepORM 可以实现了任意层级的关系的存储。

在 entity 上使用 @Tree 标识，然后通过 @TreeParent 和 @TreeChildren 标识存储父子节点的属性。

之后可以用 getTreeRepository 的 find、findTrees、findRoots、findAncestorsTree、findAncestors、findDescendantsTree、findDescendants、countDescendants、countAncestors 等 api 来实现各种关系的查询。

存储方式可以指定 closure-table 或者 materialized-path，这两种方式一个用单表存储，一个用两个表，但实现的效果是一样的。