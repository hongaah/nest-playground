import { Get, Controller } from '@nestjs/common';
import { CircularDependencyService } from './circular-dependency.service';

@Controller('circular-dependency')
export class CircularDependencyController {
  constructor(
    private readonly circularDependencyService: CircularDependencyService,
  ) {}

  @Get()
  getHello(): string {
    return this.circularDependencyService.getHello();
  }
}
