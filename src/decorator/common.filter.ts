import {
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  Catch,
} from '@nestjs/common';

import { Response } from 'express';

@Catch(HttpException)
export class CommonFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
