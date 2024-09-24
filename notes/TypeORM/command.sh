# 创建项目
npx typeorm@latest init --name typeorm-relation-mapping --database mysql

# 创建 entity
npx typeorm entity:create src/entity/IdCard

# migration 建表
# typeorm 提供了一个 cli，执行 migration:create 的命令可以生成空的迁移文件
# 可以在 mysql workbench 里导出下建表 sql 语句：Server - Data Export，自动生成创建修改表的语句
npx ts-node ./node_modules/typeorm/cli migration:create ./src/migration/Aaa

# 用 migration:generate 来生成写好的迁移文件，根据 data-source.ts 引用的实体。
npx ts-node ./node_modules/typeorm/cli migration:generate ./src/migration/Aaa -d ./src/data-source.ts

# 用 migration:run 来手动建表
npx ts-node ./node_modules/typeorm/cli migration:run -d ./src/data-source.ts

# migration 修改表
# 如果是相同的 data-source 实体，生成的 migration 文件是修改表的语句，
npx ts-node ./node_modules/typeorm/cli migration:generate ./src/migration/Bbb -d ./src/data-source.ts

# migration 撤销
# 执行 migration:revert 会执行上次的 migration 的 down 方法，并且从 migrations 表里删掉执行记录。
# 不断执行相同语句，会一直撤销上去
npx ts-node ./node_modules/typeorm/cli migration:revert -d ./src/data-source.ts
