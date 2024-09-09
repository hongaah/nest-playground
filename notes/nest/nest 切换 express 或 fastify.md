# nest 切换 express 或 fastify

express 是基于中间件的洋葱模型处理请求、响应的库，它并没有提供组织代码的架构特性，代码可以写的很随意。而为了更好的可维护性，我们都会用 Nest 这种一站式企业级开发框架，就像 java 里会用 Spring 框架一样。Nest 提供了 IOC、AOP 等架构特性，规定了代码组织的形式，而且对 websocket、graphql、orm 等各种方案都提供了开箱即用的支持。

对于请求库，Nest 底层默认是 express，它内部实现是基于 interface 的，而且提供了 @nestjs/platform-express、@nestjs/platform-fastify 这两个 adapter 包。这种适配器模式可以轻松的切换 express、fastify 或者其他的 http 请求处理的库。

也就是说 Nest 内部并没有直接依赖任何一个 http 处理的库，只是依赖了抽象的接口，想用什么库需要实现这些接口的适配器。

```ts
// express
import { NestExpressApplication } from '@nestjs/platform-express';
const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  ...loggerConfig,
});

// fastify
// pnpm install fastify @nestjs/platform-fastify
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

const app = await NestFactory.create<NestFastifyApplication>(
  AppModule,
  new FastifyAdapter(),
);
```
