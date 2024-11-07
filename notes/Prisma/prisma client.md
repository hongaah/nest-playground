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

## Prisma Client 的多表 CRUD 的 API

多 model 关联的时候涉及到多个表的 CRUD 方法也是通过 findXxx、updateXxx、deleteXxx、createXxx 那些方法，只不过查询的时候可以通过 include 包含关联记录，新增修改的时候可以通过 create、connect、connectOrCreate 来关联或者插入记录。

此外，还可以直接执行 sql。

🌰：notes\Prisma\prisma-test
📄 schema.prisma：notes\Prisma\prisma-test\prisma\schema.multi.prisma 改名：schema.prisma

```sh
npx prisma migrate reset

npx prisma migrate dev --name aaa

npx ts-node ./src/client-demo/multi.ts
```
