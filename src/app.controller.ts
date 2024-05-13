import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

// AppController 声明了 @Controller，代表这个 class 可以被注入，nest 也会把它放到 IoC 容器里。
// Controller 只需要被注入，所以 nest 单独给它加了 @Controller 的装饰器。
@Controller()
export class AppController {
  // AppController 的构造器参数依赖了 AppService。
  // 构造器注入
  // constructor(private readonly appService: AppService) {}

  // 属性注入
  // AppController 只是声明了对 AppService 的依赖，就可以调用它的方法了
  // nest 在背后自动做了对象创建和依赖注入的工作
  @Inject(AppService)
  private appService: AppService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
