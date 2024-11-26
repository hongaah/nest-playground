## Prisma commands

npx prisma -h

### init：创建 schema 文件

prisma init
prisma init --datasource-provider mysql
prisma init --url mysql://root:hazel@localhost:3306/prisma_test

### db：同步数据库和 schema

prisma db pull：把数据库里的表同步到 schema 文件
prisma db push：把 schema 文件里的表同步到数据库，并且生成了 client 代码（测试：把表删掉后执行）
prisma db seed：执行脚本插入初始数据到数据库，在 prisma/seed.ts 添加数据脚本，执行 package.json 里的 prisma 配置命令 `npx prisma db seed`
prisma db execute --file prisma/test.sql --schema prisma/schema.prisma：执行 sql，执行 prisma/test.sql 的内容

### mirgrate：生成数据表结构更新的 sql 文件

mirgrate 是迁移的意思，在这里是指表的结构变化

prisma migrate dev --name init：根据 schema 的变化生成一个名为 init 的 sql 文件，然后执行这个 sql 文件，生成表结构，并且生成 prismaClient 代码，而且会自动执行 prisma db seed，插入初始化数据。
prisma migrate reset：重置数据库，删除所有表，然后执行 prisma migrate dev。

### generate：根据 shcema 文件生成 client 代码

prisma generate --schema prisma/schema.prisma：generate 命令只是用来生成 client 代码的，他并不会同步数据库。根据 schema 定义，在 node_modules/@prisma/client 下生成代码，用于 CRUD。

可以修改 prisma/schema.prisma 里的 generator 配置，指定 client 的输出路径，默认是 node_modules/.prisma/client

```
generator client {
  provider = "prisma-client-js"
  <!-- 在根目录生成 -->
  output   = "../generated/client"
}
```

#### ERROR: EPERM: operation not permitted, rename 'D:\code\nest-playground\node_modules\.pnpm\@prisma+client@5.22.0_prisma@5.22.0\node_modules\.prisma\client\query_engine-windows.dll.node.tmp8988' -> 'D:\code\nest-playground\node_modules\.pnpm\@prisma+client@5.22.0_prisma@5.22.0\node_modules\.prisma\client\query_engine-windows.dll.node'

重新安装依赖 + 修改 @prisma/client 的生成路径

#### [generator](https://www.prisma.io/docs/orm/prisma-schema/overview/generators#community-generators) 除了可以生成 client 代码外，还可以生成别的东西。

npm install --save-dev prisma-docs-generator
npm install --save-dev prisma-json-schema-generator

```.prisma :schema.prisma 配置生成器
generator client {
  provider = "prisma-client-js"
  output   = "../generated/client"
}

generator docs {
  provider = "node node_modules/prisma-docs-generator"
  output   = "../generated/docs"
}

generator json {
  provider = "prisma-json-schema-generator"
  output   = "../generated/json"
}

datasource db {
  // 指定连接的数据库的类型
  provider = "mysql"
  // 指定连接的数据库地址，读取 env 的变量
  url      = env("DATABASE_URL")
}
```

```sh
npx prisma generate --schema prisma/schema.all.prisma

# json schema 的 generator 会把 schema 文件转为 json 版
# docs 的则是会生成文档：./generated/docs，文档里会列出 model 的所有字段，还有它的所有 CRUD 方法，每个方法的参数的类型等
npx http-server
```

Error: spawn prisma-json-schema-generator ENOENT
FIX: 
generator json {
  <!-- provider = "prisma-json-schema-generator" 调整为以下 -->
  provider = "node node_modules/prisma-json-schema-generator"
  output   = "../generated/json"
}

### studio：用于 CRUD 的图形化界面

prisma studio

### validate：检查 schema 文件的语法错误

prisma validate

### format：格式化 schema 文件

prisma format

### version：版本信息

prisma version
