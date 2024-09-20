# TypeORM

[basic](./typeorm-all-feature/README.md)

## nest & TypeORM

🌰：src\test-typeorm

在 Nest 里集成 test-typeorm 只是对 TyprOrm 的 api 封装了一层。

使用方式是在根模块 TypeOrmModule.forRoot 传入数据源配置。然后就可以在各处注入 DataSource、EntityManager 来做增删改查了。如果想用 Repository 来简化操作，还可以在用到的模块引入 TypeOrmModule.forFeature 的动态模块，传入 Entity，会返回对应的 Repository。这样就可以在模块内注入该 Repository 来用了。

原理是 TypeOrmModule.forRoot 对应的动态模块是全局的，导出了 dataSource、entityManager，所以才可以到处注入。而 TypeOrmModule.forFeature 则会根据把传入 Entity 对应的 Repository 导出，这样就可以在模块内注入了。
