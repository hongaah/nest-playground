import { Controller, Inject, Get, Logger, Post, Body } from '@nestjs/common';
import { MyLoggerService } from './my-logger.service';
import { CustomLoggerProvider } from './CustomLoggerProvider';
import { CustomLoggerDynamic } from './CustomLoggerDynamic';

@Controller('my-logger')
export class MyLoggerController {
  constructor(private readonly myLoggerService: MyLoggerService) {}

  private logger = new Logger();

  @Inject(CustomLoggerProvider)
  private customLoggerProvider: CustomLoggerProvider;
  @Inject(CustomLoggerDynamic) private customLoggerDynamic: CustomLoggerDynamic;

  @Get()
  getHello(): string {
    this.logger.debug('aaa', MyLoggerService.name);
    this.logger.error('bbb', MyLoggerService.name);
    this.logger.log('ccc', MyLoggerService.name);
    this.logger.verbose('ddd', MyLoggerService.name);
    this.logger.warn('eee', MyLoggerService.name);

    return this.myLoggerService.getHello();
  }

  @Get('custom')
  getCustomLogger(): string {
    this.customLoggerProvider.log('test custom logger', MyLoggerService.name);
    this.customLoggerDynamic.log('test logger dynamic', MyLoggerService.name);

    return 'I am custom logger';
  }

  /**
   * 接收日志/客户端请求
   *
   * eg from:
   * notes\28 日志\winston\basic.js
   * public\log.html
   */
  @Post('log')
  log(@Body() body) {
    console.log('接收日志/客户端请求：', body);
    return 'send log client ok!';
  }
}
