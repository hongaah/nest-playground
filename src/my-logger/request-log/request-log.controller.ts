import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { RequestLogService } from './request-log.service';
import { RequestLogInterceptor } from './request-log.interceptor';

@UseInterceptors(RequestLogInterceptor)
@Controller('request-log')
export class RequestLogController {
  constructor(private readonly requestLogService: RequestLogService) {}

  @Get()
  findAll() {
    return this.requestLogService.helloRequestLog();
  }
}
