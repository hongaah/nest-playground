# nest 命令

nest 在 @nestjs/cli 包里提供了 nest 命令，它可以用来做很多事情：

- 生成项目结构和各种代码
- 编译代码
- 监听文件变动自动编译
- 打印项目依赖信息

也就是这些子命令：

- nest new 快速创建项目
- nest generate 快速生成各种代码
- nest build 使用 tsc 或者 webpack 构建代码
- nest start 启动开发服务，支持 watch 和调试
- nest info 打印 node、npm、nest 包的依赖版本

并且，很多选项都可以在 nest-cli.json 里配置，比如 generateOptions、compilerOptions 等。

```bash
npm install -g @nestjs/cli
npm update -g @nestjs/cli

nest -h
nest new 项目名
nest new 项目名 -p npm

nest 命令除了可以生成整个项目外，还可以生成一些别的代码
nest generate -h // 代码模版的集合是在 @nestjs/schematics 这个包里定义
nest generate controller aaa
nest generate module aaa
nest generate service aaa
nest generate resource aaa // 完整生成一个模块，支持 http、websocket、graphql、tcp，支持是否生成 CRUD 代码

nest g resource aaa --no-spec // --no-spec 是不生成测试文件

nest g guard login --no-spec --flat // 创建一个 guard
nest g interceptor my-cache --no-spec --flat // 创建一个 interceptor --flat 是不生成 interceptors 目录
nest g pipe validate --no-spec --flat // 创建一个 pipe
nest g filter test --no-spec --flat // 创建一个 filter

nest build // --wepback 和 --tsc 是指定用什么编译，默认是 tsc 编译，也可以切换成 webpack。
nest build --watch // 监听文件变动，自动 build，但是 --watch 默认只是监听 ts、js 文件
nest build --watchAssets // --watchAssets 会连别的文件一同监听变化，并输出到 dist 目录，比如 md、yml 等文件。

nest start
nest start --watch // 改动文件之后自动重新 build
nest start --debug // 启动调试的 websocket 服务，用来 debug

nest info // 查看项目信息的，包括系统信息、node、npm 和依赖版本

# graphql resolver
nest g resolver student

# nest 创建 monorepo 和 library
nest g app xxx
nest g lib xxx
```

## nestCLI.json

```json :nestCLI.json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "generateOptions": {
    "spec": false,
    "flat": false
  },
  "compilerOptions": {
    "webpack": false, // 使用 tsc 编译 sourcemap
    "deleteOutDir": true, // 删除 dist 目录
    "watchAssets": true, // 监听静态文件
    "assets": ["*.env"] // 监听静态文件的路径
  }
}

```
