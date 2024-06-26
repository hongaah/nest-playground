import { Get, Inject, Controller } from '@nestjs/common';
import { TestGlobalService } from './test-global.service';
import { CustomLoggerProvider } from '../my-logger/CustomLoggerProvider';
import { CustomLoggerDynamic } from '../my-logger/CustomLoggerDynamic';

@Controller('test-global')
export class TestGlobalController {
  @Inject(CustomLoggerProvider) private logger: CustomLoggerProvider;
  @Inject(CustomLoggerDynamic) private loggerDynamic: CustomLoggerDynamic;

  constructor(private readonly testGlobalService: TestGlobalService) {}

  @Get()
  getHello(): string {
    this.logger.log('test logger', TestGlobalService.name);
    this.loggerDynamic.log('test logger dynamic', TestGlobalController.name);
    return this.testGlobalService.getHello();
  }
}
