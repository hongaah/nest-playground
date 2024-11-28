# 基于 gRPC 实现跨语言的微服务通信

不同语言的微服务之间可以基于 gRPC 来相互调用对方的方法，gRPC，它是 google 出的一种跨语言的远程方法调用的方案。其中RPC 指的是 Remote Procedure Call，远程过程调用。

gRPC 它的实现方式是通过 protocol buffer 的语法来定义通信数据的格式，定义 package、service。然后 server 端实现 service 对应的方法，client 端远程调用这些 service。这样就可以实现在 java、node、go、python 等多种语言之间实现微服务的远程方法调用。

为什么不采用 http 呢？因为 http 是文本传输，通信效率低，更重要的是这些微服务并不会提供 http 接口，因为它们不是直接面向客户端的。

🌰 实践：用两个 nest 的微服务之间实现 gRPC 通信
nest-monorepo\apps\grpc-client
nest-monorepo\apps\grpc-server

1. 创建 nest monorepo，启动和安装依赖

```sh
# grpc-server 作为 grpc 的微服务，修改 server 端口号为 3003
nest g app grpc-server
# 修改 client 端口号为 3004
nest g app grpc-client

pnpm start:dev grpc-client
pnpm start:dev grpc-server

pnpm add @nestjs/microservices @grpc/grpc-js @grpc/proto-loader
```

2. server 端创建微服务，修改传输方式 transport 改为 GRPC，然后指定微服务监听端口为 8888，options 指定 protoPath：

```ts
// grpc-server/src/main.ts
async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(
    GrpcServerModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:8888',
        package: 'book',
        protoPath: join(__dirname, 'book/book.proto'),
      },
    },
  );

  app.listen();
}
bootstrap()

// grpc-server/src/grpc-server.controller.ts
// book.proto 只是定义了可用的方法和参数返回值的格式，我们还要在 controller 里实现对应的方法
@GrpcMethod('BookService', 'FindBook')
findBook(data: { id: number}) {
    const items = [
      { id: 1, name: '前端调试通关秘籍', desc: '网页和 node 调试' },
      { id: 2, name: 'Nest 通关秘籍', desc: 'Nest 和各种后端中间件' },
    ];
    return items.find(({ id }) => id === data.id);
}

```

3. client 端添加连接 grpc-server 的微服务的配置，注入 BOOK_PACKAGE 的 grpc 客户端对象。在 onModuleInit 的时候调用 getService 方法，拿到 BookService 的实例。然后调用它的 findBook 方法。

```ts
// grpc-client\src\grpc-client.module.ts
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BOOK_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:8888',
          package: 'book',
          // 同样，客户端也是需要 proto 文件的，不然不知道怎么解析协议数据，所以也要复制一份 book/book.proto 文件。
          protoPath: join(__dirname, 'book/book.proto'),
        },
      },
    ]),
  ],
  controllers: [GrpcClientController],
  providers: [GrpcClientService],
})

// grpc-client/src/grpc-client.controller.ts
interface FindById {
  id: number;
}
interface Book {
  id: number;
  name: string;
  desc: string;  
}
interface BookService {
  findBook(param: FindById): Book 
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject('BOOK_PACKAGE') 
  private client: ClientGrpc;

  private bookService: BookService;

  onModuleInit() {
    this.bookService = this.client.getService('BookService');
  }

  @Get('book/:id')
  getHero(@Param('id') id: number) {
    return this.bookService.findBook({
      id
    });
  }
}

```

## protocol buffer

protocol buffer 是一种用于通信的语言，各种语言都支持这种语法的解析。具体是用于定义数据格式的文本格式，它定义了数据类型、字段、字段顺序等信息，然后编译成对应语言的代码，从而实现数据的序列化和反序列化。

vscode 可以安装个处理 .proto 文件语法高亮插件：ext:proto
两个端都需要定义 book.proto 文件，定义了 book 的数据类型，以及 book 的增删改查方法。

🌰：nest-monorepo\apps\grpc-server\src\book\book.proto、nest-monorepo\apps\grpc-client\src\book\book.proto

```json :nest-cli.json 添加 assets 配置，让 nest 在 build 的时候把 proto 也复制到 dist 目录下
{
  "compilerOptions": {
    "assets": ["**/*.proto"],
    "watchAssets": true,
  },
}
```

```proto :book.proto
// 定义使用 proto3 版本的语法
syntax = "proto3";

// 命名空间 当前包为 book
package book;

// 定义当前服务可以远程调用的方法
service BookService {
  // 查询书籍 定义一个 FindBook 方法，参数是 BookById，返回值是 Book
  rpc FindBook (BookById) returns (Book) {}
}

// 定义参数的信息格式
message BookById {
  int32 id = 1;
}

// 定义返回的信息格式
message Book {
  int32 id = 1;
  string name = 2;
  string desc = 3;
}
```
