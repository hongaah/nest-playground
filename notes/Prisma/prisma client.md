# prisma client

## Prisma Client 的单个表 CRUD 的 API

分别包括 create、crateMany、update、updateMany、delete、deleteMany、findMany、findFirst、findFirstOrThrow、findUnique、findUniqueOrThrow。

以及 count、aggregate、groupBy 这些统计相关的。

🌰：notes\Prisma\prisma-test
📄 schema.prisma：notes\Prisma\prisma-test\prisma\schema.client.prisma 改名：schema.prisma
🥔 seed.ts: notes\Prisma\prisma-test\prisma\seed.client.ts 改名：seed.ts

```sh
npx prisma migrate reset

npx prisma migrate dev --name aaa

# 添加数据
npx prisma db seed

# 查询 API, docs generator 生成了文档可以起一个服务看 API
npx http-server ./generated/docs

npx ts-node ./src/client-demo/index.ts
```
