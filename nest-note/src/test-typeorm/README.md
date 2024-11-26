# # Nest 项目里使用 TypeORM 迁移

## 数据迁移步骤

- 创建 data-source.ts 供 migration 用
  要导出 new DataSource 示例，见：src\test-typeorm\config\data-source-migration.ts 
  解决 Error: Given data source file must contain export of a DataSource instance
- 把 synchronize 关掉
- 用 migration:generate 生成创建表的 migration
- 用 migration:run 执行
- 用 migration:create 创建 migration，然后填入数据库导出的 sql 里的 insert into 语句
- 用 migration:run 执行
- 用 migration:generate 生成修改表的 migration
- 用 migration:run 执行

```json :package.json
{
  "scripts": {
    "typeorm": "ts-node ./node_modules/typeorm/cli",
    "migration:create": "npm run typeorm -- migration:create",
    "migration:generate": "npm run typeorm -- migration:generate -d ./src/test-typeorm/config/data-source-migration.ts",
    "migration:run": "npm run typeorm -- migration:run -d ./src/test-typeorm/config/data-source-migration.ts",
    "migration:revert": "npm run typeorm -- migration:revert -d ./src/test-typeorm/config/data-source-migration.ts"
  }
}
```

```sh
# 比如迁移开发环境重新写的表和数据，可以在 mysql workbench 里合并导出下 sql 语句做准备工作：Server - Data Export，然后借助 typeorm/cli 生成 migration 文件，再执行迁移操作：创建表、修改表、插入数据。

# 自动生成表结构
npm run migration:generate ./src/test-typeorm/migrations/Init
# 执行建表操作
npm run migration:run

# 修改表结构
npm run migration:generate ./src/test-typeorm/migrations/add-tag-column
# 执行修改操作
npm run migration:run

# 新建数据迁移文件，复制导出的那个 sql 里的 insert into 语句
npm run migration:create ./src/test-typeorm/migrations/Data
# 执行插入数据操作
# 上次的 migration 就没执行了，因为 migrations 表里已经记录过了就不会再执行了
npm run migration:run
```
