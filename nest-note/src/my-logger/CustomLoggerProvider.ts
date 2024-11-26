import { ConsoleLogger, Injectable } from '@nestjs/common';

// 添加 @Injectable() 装饰器，代表这是一个 provider，并且要在 Module 里引入
@Injectable()
export class CustomLoggerProvider extends ConsoleLogger {
  log(message: string, context: string) {
    console.log('---------- loggger begin ----------');
    console.log(`INFO [${context}]`, message);
    console.log('---------- loggger end ----------');
  }
}
