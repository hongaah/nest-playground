import { Injectable } from '@nestjs/common';

@Injectable()
export class ExecutionContextService {
  getHello() {
    return 'Hello ExecutionContextService!';
  }
}
