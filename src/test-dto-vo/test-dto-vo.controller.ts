import { Controller, Get } from '@nestjs/common';
import { TestDtoVoService } from './test-dto-vo.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Vo Demo')
@Controller('test-dto-vo')
export class TestDtoVoController {
  constructor(private readonly testDtoVoService: TestDtoVoService) {}

  @Get()
  getHello() {
    return this.testDtoVoService.getHello();
  }
}
