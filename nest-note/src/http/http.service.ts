import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpService {
  getHello() {
    return 'I am httpService';
  }
}
