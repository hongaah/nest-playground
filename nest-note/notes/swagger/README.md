# swagger

```sh
pnpm i @nestjs/swagger

# http://localhost:3000/doc
pnpm start:dev
```

```ts :main.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// swagger
const config = new DocumentBuilder()
  .setTitle('Test example')
  .setDescription('The API description')
  .setVersion('1.0')
  .addTag('test')
  .build();
const document = SwaggerModule.createDocument(app, config);
// 指定在哪个路径可以访问文档
SwaggerModule.setup('doc', app, document);

```

## 装饰器

- ApiOperation：声明接口信息
- ApiResponse：声明响应信息，一个接口可以多种响应
- ApiQuery：声明 query 参数信息
- ApiParam：声明 param 参数信息
- ApiBody：声明 body 参数信息，可以省略
- ApiProperty：声明 dto、vo 的属性信息
- ApiPropertyOptional：声明 dto、vo 的属性信息，相当于 required: false 的 ApiProperty
- ApiTags：对接口进行分组
- ApiBearerAuth：通过 jwt 的方式认证，也就是 Authorization: Bearer xxx
- ApiCookieAuth：通过 cookie 的方式认证
- ApiBasicAuth：通过用户名、密码认证，在 header 添加 Authorization: Basic xxx

## dto vo entity

dto 是 data transfer object，用于参数的接收。
vo 是 view object，用于返回给视图的数据的封装。
entity 是和数据库表对应的实体类。

## 授权 jwt、cookie、basic

swagger 接口右侧的图标锁变成锁住状态，代表授权成功了。

很多接口需要登录才能访问的，那如何限制呢？swagger 常用的认证方式就是 jwt、cookie。

在接口分别加上 @ApiBearerAuth() @ApiCookieAuth() @ApiBasicAuth()，
然后在 main.ts 分别配置账号密码即可。这样，这些需要授权的接口就分别添加上了不同的认证方式的标识。

- jwt: @ApiBearerAuth() 请求时会带上 `Authorization: Bearer xxxx` 的 header 来访问
- cokkie: @ApiCookieAuth() 请求时会带上 `Cookie: cookie=xxxx` 的 header 来访问
- basic: @ApiBasicAuth() 会要求输入用户名密码，请求时会带上 `Authorization: Basic xxxx` 的 header 来访问

```ts
const config = new DocumentBuilder()
  .setTitle('Test example')
  .setDescription('The API description')
  .setVersion('1.0')
  .addTag('test')
  .addBasicAuth({
    type: 'http',
    name: 'basic',
    description: '用户名 + 密码'
  })
  .addCookieAuth('sid', {
    type: 'apiKey',
    name: 'cookie',
    description: '基于 cookie 的认证'
  })
  .addBearerAuth({
    type: 'http',
    description: '基于 jwt 的认证',
    name: 'bearer'
  })
  .build();

```

## openapi

一般 api 接口的平台都是支持 openapi 的。swagger 也是 openapi 标准的实现，可以在 url 后加个 -json 拿到对应的 json，然后导入别的接口文档平台来用。

http://localhost:3000/doc-json
