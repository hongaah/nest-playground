import { Injectable } from '@nestjs/common';

@Injectable()
export class SwaggerService {
  getHello() {
    return 'I am SwaggerService';
  }
}
