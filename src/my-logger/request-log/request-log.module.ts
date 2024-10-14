import { Module } from '@nestjs/common';
import { RequestLogService } from './request-log.service';
import { RequestLogController } from './request-log.controller';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { RequestLogInterceptor } from './request-log.interceptor';
import { httpModuleRegiser } from 'src/httpConfig/index';

@Module({
  imports: [httpModuleRegiser],
  controllers: [RequestLogController],
  providers: [
    RequestLogService,
    // 这里启用拦截器也会作用到全局
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: RequestLogInterceptor,
    // },
  ],
})
export class RequestLogModule {}
