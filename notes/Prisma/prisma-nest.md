# Nest 集成 Prisma

📄 schema.prisma：prisma\schema.part1.prisma 改名：schema.prisma
🛢 env 的 DATABASE_URL 修改为 "mysql://root:hazel@localhost:3306/prisma_test"

```sh
pnpm add -D prisma
pnpm add @prisma/client

# 初始化 prisma
npx prisma init --datasource-provider mysql

npx prisma migrate reset
# 初始化 prisma 的表结构，或修改 model 后生成迁移文件
npx prisma migrate dev --name init

nest g resource prisma --no-spec
```

🌰：src\prisma
创建了个 Service 继承 PrismaClient，在 constructor 里设置初始化参数。之后把这个 service 的实例注入到别的 service 里，就可以做 CRUD 了。

创建数据库数据：http://localhost:3000/prisma/create
