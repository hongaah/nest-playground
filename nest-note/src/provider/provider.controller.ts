import { Controller, Get, Inject } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { AnyProvider } from './AnyProvider';

/**
 * @Controller
 *
 * ProviderController 声明了 @Controller，代表这个 class 可以被注入，nest 也会把它放到 IoC 容器里。
 * Controller 只需要被注入，所以 nest 单独给它加了 @Controller 的装饰器。
 */

@Controller('provider')
export class ProviderController {
  /**
   * @Inject
   *
   * ProviderController 只是声明了对 ProviderService 的依赖，就会自动注入，就可以调用它的方法了，nest 在背后自动做了对象创建和依赖注入的工作
   *
   * 通过 @Inject 指定注入 service provider 的 token。有些 AppService 这个 class 本身就是 token，可以省略，注入的方式有两种：
   * 构造器注入
   * 属性注入
   */
  // constructor(@Inject(ProviderService) private readonly providerService: ProviderService) {}
  // constructor(private readonly providerService: ProviderService) {}
  constructor(private readonly anyProvider: AnyProvider) {}

  @Inject(ProviderService) private readonly providerService: ProviderService;
  @Inject('person') private readonly person: { name: string; age: number };
  @Inject('person2') private readonly person2: { name: string; age: number };
  @Inject('person3') private readonly person3: { name: string; desc: string };
  @Inject('person4') private readonly person4: { name: string; desc: string };

  @Get('anyProvider')
  getAnyProvider(): string {
    return this.anyProvider.getHello();
  }

  @Get()
  getHello(): string {
    return `
    1. ${this.providerService.getHello()}\n
    2. person: ${JSON.stringify(this.person)}\n
    3. person2: ${JSON.stringify(this.person2)}\n
    4. person3: ${JSON.stringify(this.person3)}\n
    5. person4: ${JSON.stringify(this.person4)}\n
    `;
  }
}
