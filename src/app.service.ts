import { Inject, Injectable } from '@nestjs/common';
import { OtherService } from './other/other.service';

// 它有一个 AppService 声明了 @Injectable，代表这个 class 可注入，那么 nest 就会把它的对象放到 IOC 容器里。
// Service 是可以被注入也是可以注入到别的对象的，所以用 @Injectable 声明
@Injectable()
export class AppService {
  @Inject(OtherService)
  private otherService: OtherService;

  getHello(): string {
    return 'Hello World!' + this.otherService.xxx();
  }
}
