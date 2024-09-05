import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { AaaException } from './AaaException';

// 处理多个上下文的异常处理 filter：http ws tcp
@Catch(AaaException)
export class AaaFilter implements ExceptionFilter {
  catch(exception: AaaException, host: ArgumentsHost) {
    console.log(exception, host);

    /**
     * ArgumentHost
     * 用于切换 http、websocket、rpc 等上下文类型的，可以根据上下文类型取到对应的 argument，让 Exception Filter 等在不同的上下文中复用。
     */

    // Http
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();

      // const request = ctx.getRequest<Request>();
      // // 取出当前上下文的 reqeust、response、next 参数。因为当前上下文是 http 服务，如果是 WebSocket 服务，这里拿到的就是别的东西了。
      // host.getArgs();
      // // 根据下标取参数
      // host.getArgByIndex(1);

      response.status(500).json({
        aaa: exception.aaa,
        bbb: exception.bbb,
      });
    }

    // Websocket
    else if (host.getType() === 'ws') {
      const ctx = host.switchToWs();
    }

    // RPC
    else if (host.getType() === 'rpc') {
      const ctx = host.switchToRpc();
    }
  }
}
