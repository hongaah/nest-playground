import { Controller, Get } from '@nestjs/common';
import { TestDtoVoService } from './test-dto-vo.service';

@Controller('test-dto-vo')
export class TestDtoVoController {
  constructor(private readonly testDtoVoService: TestDtoVoService) {}

  @Get()
  getHello() {
    return this.testDtoVoService.getHello();
  }
}
