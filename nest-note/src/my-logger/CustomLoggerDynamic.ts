import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';

// 动态模块
@Injectable()
export class CustomLoggerDynamic extends ConsoleLogger {
  @Inject('LOG_OPTIONS')
  public options: Record<string, any>;

  log(message: string, context: string) {
    console.log('---------- loggger begin ----------');
    console.log(this.options);
    console.log(`INFO [${context}]`, message);
    console.log('---------- loggger end ----------');
  }
}
