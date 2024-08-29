import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from 'src/http/http.service';

// provider 可以是任何的 class，在 @Module 的 providers 数组里注册即可。
@Injectable()
export class AnyProvider {
  // import HttpModule 就能使用 HttpModule exports 的 provider
  constructor(@Inject(HttpService) private readonly httpService: HttpService) {}

  getHello() {
    return `from anyOther: ${this.httpService.getHello()}`;
  }
}
