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
📄：notes\Prisma\prisma-test\prisma\schema.simple.prisma 改名：schema.prisma
🥔 seed.ts: notes\Prisma\prisma-test\prisma\seed.simple.ts 改名：seed.ts

业务场景1：
创建 2 个 user，然后查询出来：
npx ts-node ./src/demo/index.ts

业务场景2：
插入一个新的 user 和它的两个 post
npx ts-node ./src/demo/index2.ts
