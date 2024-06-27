import { Controller, Get, Logger } from '@nestjs/common';
import { MyWinstonLoggerService } from './my-winston-logger.service';

@Controller('my-winston-logger')
export class MyWinstonLoggerController {
  constructor(
    private readonly myWinstonLoggerService: MyWinstonLoggerService,
  ) {}

  private logger = new Logger();

  @Get()
  getHello(): string {
    this.logger.log('Hello my-winston-logger!', MyWinstonLoggerController.name);
    return 'Hello my-winston-logger!';
  }
}
