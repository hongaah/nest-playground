import { LoggerService } from '@nestjs/common';

// 自定义日志打印的方式，定义一个实现 LoggerService 接口的类
export class CustomLogger implements LoggerService {
  log(message: string, context: string) {
    console.log(`---log---[${context}]---`, message);
  }

  error(message: string, context: string) {
    console.log(`---error---[${context}]---`, message);
  }

  warn(message: string, context: string) {
    console.log(`---warn---[${context}]---`, message);
  }
}
