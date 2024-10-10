# env 配置文件

基于 dotenv、js-yaml 可以读取 .env 和 yaml 的配置文件。

## dotenv

```sh
npm install dotenv

# 可以通过 NODE_ENVIRONMENT 来切换不同路径的配置文件，实现开发、生产环境的配置切换。
# export 是 Bash 或其他 Unix shell 中的命令
export NODE_ENVIRONMENT='development'
# $env: 用在 PowerShell
$env:NODE_ENVIRONMENT='development'
node ./src/dotenv-demo.js --env development

$env:NODE_ENVIRONMENT='production'
node ./src/dotenv-demo.js --env production

# 如果手动置顶了环境变量，会以手动指定的优先
$env:aaa='qqqq'
node src/dotenv-demo.js
```

## yaml

yaml 的格式更适合有层次关系的配置，而 .env 更适合简单的配置。

```sh
npm install js-yaml

node src/yaml-demo.js
```

## nest @nestjs/config

Nest 提供了 @nestjs/config 包来封装，使用 ConfigModule.forRoot 可以读取 .env 配置文件，然后注入 ConfigService 来取配置。

@nestjs/config 是动态模块的方式，他有 forRoot 和 forFeature 两个方法。动态模块的 forRoot 一般用于在 AppModule 里注册，指定为全局模块，forFeature 用于局部配置，在不同模块里 imports，而 register 用于一次性的配置。

环境变量配置文件可以放在任何地方，也支持动态获取，比如用在微服务，配置中心，nacos、etcd 这种中间件。

🌰：
全局配置：src\test-env（测试发现不仅限于 AppModule注册的才是全局模块）
局部配置：src\test-global

```sh
pnpm add @nestjs/config
pnpm add js-yaml
```

### nest env 编译配置

```json :nest-cli.json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "generateOptions": {
    "spec": false,
    "flat": false
  },
  "compilerOptions": {
    "webpack": true,
    "deleteOutDir": true,
    // .env 需要配置下 assets 才会在编译包时复制到 dist。
    // 注意，assets 只支持 src 下的文件复制。如果是放在根目录，那就要自己复制了。
    "assets": ["*.env"],
    // 默认是 false，开启后，会在每次编译时，都会复制 assets 到 dist。
    "watchAssets": true,
  }
}
```