import { Injectable } from '@nestjs/common';

@Injectable()
export class MyLoggerService {
  getHello() {
    return 'I am LoggerService';
  }
}
