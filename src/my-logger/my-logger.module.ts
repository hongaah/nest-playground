import { DynamicModule, Global, Module } from '@nestjs/common';
import { MyLoggerService } from './my-logger.service';
import { MyLoggerController } from './my-logger.controller';
import { CustomLoggerProvider } from './CustomLoggerProvider';
import { CustomLoggerDynamic } from './CustomLoggerDynamic';
import { RequestLogModule } from './request-log/request-log.module';

@Global()
@Module({
  controllers: [MyLoggerController],
  providers: [MyLoggerService, CustomLoggerProvider, CustomLoggerDynamic],
  exports: [CustomLoggerProvider, CustomLoggerDynamic],
  imports: [RequestLogModule],
})
export class MyLoggerModule {
  static register(options): DynamicModule {
    return {
      module: MyLoggerModule,
      providers: [
        CustomLoggerDynamic,
        {
          provide: 'LOG_OPTIONS',
          useValue: options,
        },
      ],
      exports: [CustomLoggerDynamic, 'LOG_OPTIONS'],
    };
  }
}
