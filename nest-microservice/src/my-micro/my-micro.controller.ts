import { Controller } from '@nestjs/common';
import { MyMicroService } from './my-micro.service';
import { MessagePattern, EventPattern } from '@nestjs/microservices';

@Controller('inner-my-micro')
export class MyMicroController {
  constructor(private readonly myMicroService: MyMicroService) {}

  // @MessagePattern 声明：消息匹配什么模式，然后调用这个方法，处理参数，返回结果
  @MessagePattern('sum')
  sum(numArr: Array<number>): number {
    return numArr.reduce((total, item) => total + item, 0);
  }

  // @EventPattern 声明：不需要返回消息
  @EventPattern('log')
  log(str: string) {
    console.log(str);
  }
}
