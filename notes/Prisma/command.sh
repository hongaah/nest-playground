# 生成 schema 层的代码
npx prisma init --datasource-provider mysql

# 基于 schema 层的代码生成 client 的代码，实现 crud
# 执行 prisma migrate dev，会生成并执行建表 sql 文件，而且在 node_modules/.prisma/client 下生成了 client 代码。
npx prisma migrate dev --name aaa

# 使用 @prisma/client 来做 CRUD
npx ts-node ./src/demo/index.ts

# Prisma 的全部命令
npx prisma -h

