# nest 集合 graphql

在 Nest 里集成了 GraphQL，graphql 主要是分为 schema、resolver 两部分。

实现过程:
GraphQLModule.forRoot 指定 typePaths 也就是 schema 文件的位置。然后用 nest g resolver 生成 resolver 文件，实现 Query、Mutaion 的方法。并且还可以切换 playground 为 apollo 的。之后就可以在 palyground 里发送 graphql 请求，做 CRUD 了

vscode 插件: 语法高亮需要安装下 graphql 插件
生成 resolver 代码: nest g resolver student

🌰:
nest 集成 GraphQL & CRUD: src\test-graphql
graphql config: src\test-graphql\graphqlConfig.ts

🌰 两种配置 playground 的方式:
```ts :graphql playground config
{
  driver: ApolloDriver,
  typePaths: ['./**/*.graphql'],
};
```

```ts :apollo playground config
{
  driver: ApolloDriver,
  typePaths: ['./**/*.graphql'],
  playground: false,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
};
```

visit: localhost:3000/graphql 可以看到 graphql 界面 (apollo 界面就可以点点点)
左侧输入栏可以输入 graphql 查询语句:

```graphql
query Xxx {
  students {
    id
    name
    age
  }
}
```
