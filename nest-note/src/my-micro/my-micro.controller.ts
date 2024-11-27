import { Controller, Inject, Get, Query } from '@nestjs/common';
import { MyMicroService } from './my-micro.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('my-micro')
export class MyMicroController {
  constructor(private readonly myMicroService: MyMicroService) {}

  @Inject('USER_SERVICE')
  private userClient: ClientProxy;

  // http://localhost:3000/my-micro/inner-my-micro/sum?num=10,12,121
  // 这里的 sum 就是微服务那边声明的这个消息，而参数就是那边声明的参数
  @Get('inner-my-micro/sum')
  calc(@Query('num') str) {
    const numArr = str.split(',').map((item) => parseInt(item));

    this.userClient.emit('log', '求和');
    return this.userClient.send('sum', numArr);
  }
}
