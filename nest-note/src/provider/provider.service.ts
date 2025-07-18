import { Injectable } from '@nestjs/common';
import { HttpService } from '../http/http.service';

/**
 * @Injectable
 * AppService 声明了 @Injectable，代表这个 class 可注入，那么 nest 就会把它的对象放到 IOC 容器里。
 * Service 是可以被注入也是可以注入到别的对象的，所以用 @Injectable 声明
 * AppService 是被 @Injectable 修饰的 class
 *
 */
@Injectable()
export class ProviderService {
  constructor(private httpService: HttpService) {}

  // @Inject(HttpService)
  // private httpService: HttpService;

  getHello(): string {
    return 'Hello provider!' + this.httpService.getHello();
  }
}
