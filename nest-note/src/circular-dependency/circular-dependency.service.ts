import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { TestGlobalService } from 'src/test-global/test-global.service';

@Injectable()
export class CircularDependencyService {
  @Inject(forwardRef(() => TestGlobalService))
  private readonly testGlobalService: TestGlobalService;

  getHello(): string {
    return 'CircularDependency, ' + this.testGlobalService.sayHello();
  }

  sayHello(): string {
    return 'Hello, I am CircularDependencyService!';
  }
}
