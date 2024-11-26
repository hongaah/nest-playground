import { Injectable } from '@nestjs/common';

@Injectable()
export class TestTypeormService {
  getHello() {
    return 'I am testTypeorm';
  }
}
