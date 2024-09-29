import { Injectable } from '@nestjs/common';

@Injectable()
export class MyPassportService {
  getHello() {
    return 'I am passport!';
  }
}
