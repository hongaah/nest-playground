import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

// 异常处理 Exception Filter
// 用 @Catch 装饰器来声明拦截什么异常
@Catch(BadRequestException)
export class TestFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse() as {
      message: string[];
    } & Response;

    response.status(400).json({
      statusCode: 400,
      message:
        'test: ' +
        (response?.message?.join
          ? response?.message?.join(',')
          : exception.message),
    });
  }
}
