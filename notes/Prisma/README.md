# Prisma

typeorm 是把表映射成 entity 类，然后调用 repository 的 api 来做 CRUD。
prisma 是把表映射成 schema 的 model，然后编译生成 client 代码，之后进行 crud。

Prisma 创造了一种 DSL（Domain Specific Language，领域特定语言），它是把表映射成了 DSL 里的 model，然后编译这个 DSL 会生成 prismaClient 的代码，之后就可以调用它的 findMany、create、delete、update 等 api 来做 CRUD 了。

## 环境配置

使用 ts：npm install typescript ts-node @types/node --save-dev
创建 tsconfig.json：npx tsc --init

prisma 语法可以安装 `prisma` 插件来添加语法高亮等支持

prisma 命令配置，在 package.json 里添加以下，然后执行 `npx prisma db seed`：
其实 seed 命令就是把跑脚本的过程封装了一下，和直接用 ts-node 跑没区别

```json
{
  "prisma": {
    "seed": "npx ts-node prisma/seed.ts"
  },
}
```

prisma 语句自动生成：

生成 schema 层的代码：npx prisma init --datasource-provider mysql
生成 sql 并执行，和生成 client 代码：npx prisma migrate dev --name aaa
client 代码在 node_modules/.prisma/client，然后就可以用 @prisma/client 来做 CRUD 了。

🌰：notes\Prisma\prisma-test
业务场景1：
创建 src/index.ts，new 一个 PrismaClient，用 create 方法创建了 2 个 user，然后查询出来：
npx ts-node ./src/demo/index.ts

业务场景2：
插入一个新的 user 和它的两个 post
npx ts-node ./src/demo/index2.ts

## Prisma commands

🌰：notes\Prisma\prisma-test\src\all-command

npx prisma -h

### init：创建 schema 文件

prisma init
prisma init --datasource-provider mysql
prisma init --url mysql://root:hazel@localhost:3306/prisma_test

### db：同步数据库和 schema

prisma db pull：把数据库里的表同步到 schema 文件
prisma db push：把 schema 文件里的表同步到数据库，并且生成了 client 代码（测试：把表删掉后执行）
prisma db seed：执行脚本插入初始数据到数据库，在 prisma/seed.ts 添加数据脚本，执行 package.json 里的 prisma 配置命令 `npx prisma db seed`
prisma db execute --file prisma/test.sql --schema prisma/schema.prisma：执行 sql，执行 prisma/test.sql 的内容

### mirgrate：生成数据表结构更新的 sql 文件

mirgrate 是迁移的意思，在这里是指表的结构变化

prisma migrate dev --name init：根据 schema 的变化生成一个名为 init 的 sql 文件，然后执行这个 sql 文件，生成表结构，并且生成 prismaClient 代码，而且会自动执行 prisma db seed，插入初始化数据。
prisma migrate reset：重置数据库，删除所有表，然后执行 prisma migrate dev。

### generate：根据 shcema 文件生成 client 代码

prisma generate：generate 命令只是用来生成 client 代码的，他并不会同步数据库。根据 schema 定义，在 node_modules/@prisma/client 下生成代码，用于 CRUD。

### studio：用于 CRUD 的图形化界面

prisma studio

### validate：检查 schema 文件的语法错误

prisma validate

### format：格式化 schema 文件

prisma format

### version：版本信息

prisma version
