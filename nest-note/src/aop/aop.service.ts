import { Injectable } from '@nestjs/common';

@Injectable()
export class AopService {
  async getHello() {
    return `Hello Aop!`;
  }
}
