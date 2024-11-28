import { Controller, Get } from '@nestjs/common';
import { GrpcServerService } from './grpc-server.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class GrpcServerController {
  constructor(private readonly grpcServerService: GrpcServerService) {}

  @Get()
  getHello(): string {
    return this.grpcServerService.getHello();
  }

  // 通过 @GrpcMethod 把它标识为 grpc 的远程调用的方法。
  @GrpcMethod('BookService', 'FindBook')
  findBook(data: { id: number }) {
    const items = [
      { id: 1, name: '前端调试通关秘籍', desc: '网页和 node 调试' },
      { id: 2, name: 'Nest 通关秘籍', desc: 'Nest 和各种后端中间件' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
