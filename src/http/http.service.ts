import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpService {
  getHello() {
    return 'Iam httpService';
  }
}
