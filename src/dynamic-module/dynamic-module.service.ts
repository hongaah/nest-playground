import { Injectable } from '@nestjs/common';

@Injectable()
export class DynamicModuleService {
  getHello() {
    return 'Hi, I am DynamicModuleService';
  }
}
