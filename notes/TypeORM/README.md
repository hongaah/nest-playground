# TypeORM

[basic](./typeorm-all-feature/README.md)
[docs](https://www.typeorm.org/)

TypeORM 是一个传统的 ORM 框架，ORM 即 Object Relational Mapping，也就是对象和关系型数据库的映射的含义，也就是把表映射到 entity 类，把表的关联映射成 entity 类的属性关联。完成 entity 和表的映射之后，你只要调用 userRepository 和 postRepository 的 find、delete、save 等 api，typeorm 会自动生成对应的 sql 语句并执行。

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

## 【数据迁移】生产环境使用 TypeORM 的 migration 迁移功能

🌰：notes\TypeORM\typeorm-all-feature\src\data-source.migration.ts

开发环境会用 synchronize 来同步 Entity 和数据库表，它会自动执行 create table、alter table，不用手动修改表结构，很方便。

但是它并不安全，因为很容易丢失数据。所以生产环境下我们会把它关掉，用 migration 来管理建表和修改表的操作。

migration 就是把 create table、alter table 等封装成一个个的 migration，可以一步步执行、也可以一步步撤销回去。

有这些常用命令：
eg: `npx ts-node ./node_modules/typeorm/cli migration:show`

migration:show：列出所有的 migration，包括已经执行和未执行的
migration:list：列出所有的 migration
migration:create：生成空白 migration 文件
migration:generate：连接数据库，根据 Entity 和数据库表的差异，生成 migration 文件
migration:run：执行 migration，会根据数据库 migrations 表的记录来确定执行哪个
migration:revert：撤销上次 migration，删掉数据库 migrations 里的上次执行记录

在 mysql workbench 里导出下建表 sql 语句：Server - Data Export，但是导出建表 sql 再复制到 migration 的 up 方法里挺麻烦的。所以可以用 typeorm 提供的 cli，自动生成语句。

## Nest 项目里使用 TypeORM 迁移

🌰：src\test-typeorm\README.md
