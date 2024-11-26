import { Injectable } from '@nestjs/common';

@Injectable()
export class TestDtoVoService {
  getHello() {
    return 'I am test-dto-vo';
  }
}
