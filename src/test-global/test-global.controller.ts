import { Get, Inject, Controller } from '@nestjs/common';
import { TestGlobalService } from './test-global.service';
import { CustomLoggerProvider } from '../my-logger/CustomLoggerProvider';
import { CustomLoggerDynamic } from '../my-logger/CustomLoggerDynamic';
import { WINSTON_LOGGER_TOKEN } from 'src/my-winston-logger/my-winston-logger.module';
import { LifecycleService } from 'src/lifecycle/lifecycle.service';
import { ConfigService } from '@nestjs/config';

@Controller('test-global')
export class TestGlobalController {
  @Inject(CustomLoggerProvider) private logger: CustomLoggerProvider;
  @Inject(CustomLoggerDynamic) private loggerDynamic: CustomLoggerDynamic;

  // 改成 inject 的方式，始终使用同一个实例，性能更好
  @Inject(WINSTON_LOGGER_TOKEN) private winstonLogger;

  @Inject(LifecycleService) private lifecycleService: LifecycleService;

  @Inject(ConfigService)
  private configService: ConfigService;

  constructor(private readonly testGlobalService: TestGlobalService) {}

  @Get()
  getHello(): string {
    this.logger.log('test logger', TestGlobalController.name);
    this.loggerDynamic.log('test logger dynamic', TestGlobalController.name);
    this.winstonLogger.log('test winston logger', TestGlobalController.name);

    return this.testGlobalService.getHello();
  }

  @Get('test-lifecycle')
  testLifecycle() {
    return this.lifecycleService.getHello();
  }

  @Get('test-env')
  getEnv() {
    return {
      aaa: this.configService.get('aaa'),
      bbb: this.configService.get('bbb'),
      xxx: this.configService.get('xxx'),
    };
  }
}
