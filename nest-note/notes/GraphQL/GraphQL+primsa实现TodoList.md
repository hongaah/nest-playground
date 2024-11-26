# GraphQL + Primsa 实现 TodoList

📄 schema.prisma：prisma\schema.todolist.prisma 改名：schema.prisma
🛢 env 的 DATABASE_URL 修改为 "mysql://root:hazel@localhost:3306/todolist"

```sh
pnpm add -D prisma
pnpm add @prisma/client 

# 初始化 prisma
npx prisma init --datasource-provider mysql

npx prisma migrate reset
# 初始化 prisma 的表结构，或修改 model 后生成迁移文件
npx prisma migrate dev --name init
# 如果 schema.prisma 生成出错可以重新生成
npx prisma generate --schema prisma/schema.prisma

nest g resource prisma --no-spec

# 集成 graphql，生成 graphql resolver
nest g resolver todolist --no-spec --flat
```

🌰：src\graphql-todolist

Nest Prisma：创建个 Service 继承 PrismaClient，在 constructor 里设置初始化参数。之后把这个 service 的实例注入到别的 service 里，就可以做 CRUD 了。

Nest GraphQL：
全局配置: 在 app.module.ts 全局配置 GraphQLModule.forRoot(graphqlConfig)
定义 schema: src\graphql-todolist\todolist.graphql
定义 resolver: src\graphql-todolist\todolist.resolver.ts，通过 @Query()、@Mutation()、@ResolveField() 等装饰器来定义 resolver

restful api: http://localhost:3000/graphql-todolist/create
graphql api(@apollo/server): localhost:3000/graphql
frontend react(@apollo/client): notes\GraphQL\graphql-crud-demo\src\react

相比 restful 的版本，graphql 只需要一个接口，然后用查询语言来查，需要什么数据取什么数据，更加灵活。
