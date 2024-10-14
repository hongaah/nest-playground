import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestLogService {
  helloRequestLog() {
    return 'Hello RequestLog!';
  }
}
