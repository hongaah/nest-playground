# Nest 如何创建微服务

单体的 http 服务项目大了之后，为了维护和扩展方便，拆分微服务是很自然的事情。通过微服务的方式可以把业务逻辑拆分到不同的微服务里。
单体架构就是所有业务逻辑都在一个服务里实现。

## 微服务

🌰：
http 服务（提供 http 接口）：nest-note
微服务（提供 tcp 的微服务通信端口）：nest-microservice

浏览器把 10,12,121 的参数传递给 http 服务，然后它给微服务发送消息，把参数带过去，微服务计算后返回了 143 给 http 服务，它再返回给浏览器:
http://localhost:3000/my-micro/inner-my-micro/sum?num=10,12,121

### 微服务的创建

微服务之间通过 tcp 方式通信，在 nest 里需要用到 @nestjs/microservices 这个包。微服务启动的时候不再调用 NestFactory.create 而是调用 NestFactory.createMicroservice 方法，指定 tcp 的端口。

```sh
pnpm add @nestjs/microservices
```

```ts :main.ts 启动一个微服务，通信端口在 8888，用 TCP 方式通信
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: 8888,
      },
    },
  );
  app.listen();
}
bootstrap();
```

微服务不需要暴露 http 接口，只需要支持微服务的通信就行，微服务里如果是用 @MessagePattern 声明的要处理的消息，http 服务就要用 send 方法调用。如果并不需要返回消息的话，可以用 @EventPattern 声明，微服务里如果是用 @EventPattern 声明的方法，http 服务要用 emit 方法调用。

```ts :app.controller.ts 微服务里处理消息 消息匹配模式
@MessagePattern('sum')
sum(numArr: Array<number>): number {
  return numArr.reduce((total, item) => total + item, 0);
}

@EventPattern('log')
log(str: string) {
  console.log(str);
}
```

### http 服务调用微服务【nest-note】

http 服务里通过 ClientsModule 来注入连接这个微服务的代理对象。之后分别用 send、emit 方法来调用微服务的 @MessagePattern、@EventPattern 声明的方法。

```sh
pnpm add @nestjs/microservices
```

引入连接微服务的客户端

```ts module.ts 引入连接微服务的客户端
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // 连接微服务，可以连多个
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 8888,
        },
      },
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

```ts :app.controller.ts http 服务调用微服务

// 注入连接微服务的客户端，注入的时候指定 TOKEN 为前面我们声明的微服务名字
@Inject('USER_SERVICE')
private userClient: ClientProxy;

@Get('sum')
calc(@Query('num') str) {
  const numArr = str.split(',').map((item) => parseInt(item));

  this.userClient.emit('log', '求和');
  return this.userClient.send('sum', numArr);
}

```

## 微服务的通信方式

通过 wireshark 抓包分析了 tcp 通信的内容，发现微服务之间的通信是基于 json 的。微服务和微服务之间一般不是用 http 来通信的，而是直接用 tcp。因为 http 的请求响应会携带大量的 header，这些增大了通信的开销。

- 微服务之间的 tcp 通信的消息格式是 json
- 如果是 message 的方式，需要两边各发送一个 tcp 包，也就是一问一答的方式
- 如果是 event 的方式，只需要客户端发送一个 tcp 的包
