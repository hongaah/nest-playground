import { Controller, Get } from '@nestjs/common';
import { TestTypeormService } from './test-typeorm.service';

@Controller('test-typeorm')
export class TestTypeormController {
  constructor(private readonly testTypeormService: TestTypeormService) {}

  @Get()
  hello() {
    return this.testTypeormService.getHello();
  }
}
