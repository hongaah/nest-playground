import { ConsoleLogger } from '@nestjs/common';

// 自定义 Logger，继承 ConsoleLogger，重写一些方法
export class CustomLoggerExtends extends ConsoleLogger {
  log(message: string, context: string) {
    console.log(`---log---[${context}]---`, message);
  }
}
