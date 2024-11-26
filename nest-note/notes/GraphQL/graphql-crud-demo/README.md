# GraphQL

GraphQL 全称是 graph query language，就是从这个对象的 graph 中查询数据的。数据对象类型和对象类型之间有关联关系，比如老师关联了学生、学生也可以关联老师，关联来关联去这不就是一个图，也就是 graph。

restful 接口是 url 代表资源，GET、POST、PUT、DELETE 请求代表对资源的增删改查。这种接口返回什么数据完全由服务端决定，每次接口变动可能就得新加一种接口。为了解决这种问题，facebook 创造了 graphql，这种接口返回什么数据完全由客户端决定。增删改查通过这一个接口就可以搞定。

graphql 需要在服务端定义 schema，也就是定义对象类型和它的字段，对象类型和对象类型之间会有关联，也就是一个 graph，查询就是从这个 graph 里查询数据。除了 schema 外，还需要有 resolver，它负责接受客户端的参数，完成具体数据的增删改查。

graphql 会暴露一个 post 接口，通过查询语言的语法就可以从通过这个接口完成所有增删改查。graphql 接口是监听 POST 请求的，用 get 请求这个 url 才会跑这个调试的工具。本地测试的时候，get 请求会跑一个 sandbox，可以在这里测试接口。

整个流程涉及到两种 DSL（领域特定语言），一个是 schema 定义的 DSL，一个是查询的 DSL。入门之后向深入的话就是要学下这两种 DSL 的更多语法。

调试:
1. 借助 @apollo/server
🌰: node ./src/test-apollo-server.js
visit http://localhost:4000/ 可以在 sandbox 页面里调试接口

2. 使用 @apollo/client, react 的 graphql 客户端
🌰: src/react

