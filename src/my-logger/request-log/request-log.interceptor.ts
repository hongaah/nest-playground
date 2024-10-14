import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import * as requestIp from 'request-ip';
import { HttpService } from '@nestjs/axios';
import * as iconv from 'iconv-lite';

@Injectable()
export class RequestLogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestLogInterceptor.name);

  @Inject(HttpService)
  private httpService: HttpService;

  async ipToCity(ip: string) {
    const response = await this.httpService.axiosRef(
      `https://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`,
      {
        responseType: 'arraybuffer',
        transformResponse: [
          function (data) {
            const str = iconv.decode(data, 'gbk');
            return JSON.parse(str);
          },
        ],
      },
    );
    return response.data.addr;
  }

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    console.log(await this.ipToCity('221.237.121.165'));

    const userAgent = request.headers['user-agent'];

    // IP 这里的 ip 会有不准的可能，如果中间经过了 nginx 等服务器的转发，这里的 ip 就是 nginx 服务器的 ip。
    const { ip, method, path } = request;
    // 所以 IP 候要取 X-Forwarded-For 这个 header，它记录着转发的客户端 ip
    const clientIp = requestIp.getClientIp(ip) || ip;

    // this.logger.debug 不会打印
    this.logger.warn(
      `${method} ${path} ${clientIp} ${userAgent}: ${context.getClass().name} ${
        context.getHandler().name
      } invoked...`,
    );

    const now = Date.now();

    return next.handle().pipe(
      tap((res) => {
        this.logger.warn(
          `${method} ${path} ${ip} ${userAgent}: ${response.statusCode}: ${Date.now() - now}ms`,
        );
        this.logger.warn(`Response: ${JSON.stringify(res)}`);
      }),
    );
  }
}
