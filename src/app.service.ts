import { Inject, Injectable } from '@nestjs/common';
import { LifecycleService } from './lifecycle/lifecycle.service';

@Injectable()
export class AppService {
  @Inject(LifecycleService)
  private lifecycleService: LifecycleService;

  getHello(): string {
    return 'Hello World!';
  }

  getGlobalHello(): string {
    return this.lifecycleService.getHello();
  }
}
