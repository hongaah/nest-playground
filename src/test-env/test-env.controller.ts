import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TestEnvService } from './test-env.service';

@Controller('test-env')
export class TestEnvController {
  constructor(private readonly testEnvService: TestEnvService) {}

  @Inject(ConfigService)
  private configService: ConfigService;

  @Get()
  getHello() {
    return {
      aaa: this.configService.get('aaa'),
      bbb: this.configService.get('bbb'),
      db: this.configService.get('db'),
      config: this.configService.get('aaa.bbb.ccc'),
      ddd: this.configService.get('ddd'),
    };
  }
}
