import { DynamicModule, Global, Module } from '@nestjs/common';
import { LoggerOptions } from 'winston';
import { WinstonLogger } from './WinstonLogger';
import { MyWinstonLoggerService } from './my-winston-logger.service';
import { MyWinstonLoggerController } from './my-winston-logger.controller';

export const WINSTON_LOGGER_TOKEN = 'WINSTON_LOGGER';

@Global()
@Module({
  controllers: [MyWinstonLoggerController],
  providers: [MyWinstonLoggerService],
})
// 封装一个动态模块，在 forRoot 方法里传入 options，模块内创建 winston 的 logger 实例。并且这个模块声明为全局模块。
// 这样，在应用的各处都可以注入我们自定义的基于 winston 的 logger 了
export class MyWinstonLoggerModule {
  public static forRoot(options?: LoggerOptions): DynamicModule {
    return {
      module: MyWinstonLoggerModule,
      providers: [
        {
          provide: WINSTON_LOGGER_TOKEN,
          useValue: new WinstonLogger(options),
        },
      ],
      exports: [WINSTON_LOGGER_TOKEN],
    };
  }
}
