# Nest 的 Monorepo 和 Library

微服务项目可能会有很多个项目，为了方便管理，我们会使用 monorepo 的方式。monorepo 就是在一个 git 仓库里管理多个项目。

nest 里创建 monorepo 以及通过 library 复用代码的方式：
nest cli 支持 monorepo，只要执行 `nest g app xxx` 就会把项目变为 monorepo 的，在 apps 下保存多个 nest 应用。

`nest-cli.json` 的 projects 字段为多个 nest 项目的信息，比如根目录、入口文件、src 目录、编译配置文件，sourceRoot 和 root 字段分别指向了默认项目的 src 目录和根目录。
`pnpm start:dev` 或者 `pnpm build` 会运行默认的app，可以加上应用名来编译对应的 app，nest cli 会根据 app 名字去读取对应的 tscofnig 文件。
`nest g lib xxx` 创建 library，用于项目的公共代码。library 保存在 libs 目录下，和 apps 一样可以有多个。nest 会为 libs 创建别名，可以在其他 app 或者 lib 里用别名引入。
`pnpm start:dev lib1`：如果你只是改 lib 下的代码，不想跑服务时，可以单独编译 lib 代码。

🌰: nest-monorepo

在一个现有的 nest 项目里运行 `nest g app xxx`，会将原有的代码迁移到 apps/[named] 下，然后创建一个新的 nest xxx 项目。

http://localhost:3001/
http://localhost:3000/aaa
