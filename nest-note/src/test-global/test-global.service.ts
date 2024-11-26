import { Get, Inject, forwardRef, Injectable } from '@nestjs/common';
import { CircularDependencyService } from 'src/circular-dependency/circular-dependency.service';

@Injectable()
export class TestGlobalService {
  @Inject(forwardRef(() => CircularDependencyService))
  private readonly circularDependencyService: CircularDependencyService;

  @Get()
  getHello(): string {
    return 'TestGlobalService' + this.circularDependencyService.sayHello();
  }

  sayHello(): string {
    return 'Hello, I am TestGlobalService!';
  }
}
