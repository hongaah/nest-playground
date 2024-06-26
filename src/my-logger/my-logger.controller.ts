import { Controller, Inject, Get, Logger } from '@nestjs/common';
import { MyLoggerService } from './my-logger.service';
import { CustomLoggerProvider } from './CustomLoggerProvider';
import { CustomLoggerDynamic } from './CustomLoggerDynamic';

@Controller('my-logger')
export class MyLoggerController {
  private logger = new Logger();

  @Inject(CustomLoggerProvider)
  private customLoggerProvider: CustomLoggerProvider;

  @Inject(CustomLoggerDynamic) private customLoggerDynamic: CustomLoggerDynamic;

  constructor(private readonly myLoggerService: MyLoggerService) {}

  @Get()
  getHello(): string {
    this.logger.debug('aaa', MyLoggerService.name);
    this.logger.error('bbb', MyLoggerService.name);
    this.logger.log('ccc', MyLoggerService.name);
    this.logger.verbose('ddd', MyLoggerService.name);
    this.logger.warn('eee', MyLoggerService.name);

    return this.myLoggerService.getHello();
  }

  @Get('/custom')
  getCustomLogger(): string {
    this.customLoggerProvider.log('test custom logger', MyLoggerService.name);
    this.customLoggerDynamic.log('test logger dynamic', MyLoggerService.name);

    return 'I am custom logger';
  }
}
