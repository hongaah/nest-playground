import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class TestGlobalService {
  @Get()
  getHello(): string {
    return 'Hello, I am TestGlobalService!';
  }
}
