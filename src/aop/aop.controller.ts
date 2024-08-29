import {
  Get,
  UseGuards,
  Controller,
  UseInterceptors,
  UsePipes,
  UseFilters,
  Query,
} from '@nestjs/common';
import { AopService } from './aop.service';
import {
  LoginGuard,
  TimeInterceptor,
  TestFilter,
  ValidatePipe,
} from './concept';

@Controller('aop')
// @UseInterceptors(TimeInterceptor)
// @UsePipes(ValidatePipe)
@UseFilters(TestFilter)
export class AopController {
  constructor(private readonly aopService: AopService) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.aopService.getHello();
  }

  // 卫视 路由级别启用
  @Get('test-aop-guard')
  @UseGuards(LoginGuard)
  testAopGuard() {
    return 'test-aop-guard';
  }

  // 拦截器 路由级别启用
  @Get('test-aop-interceptor')
  @UseInterceptors(TimeInterceptor)
  testAopInterceptor() {
    console.log('test-aop-interceptor...');
    return 'test-aop-interceptor';
  }

  // 管道 路由级别启用
  @Get('test-aop-pipe')
  @UseFilters(TestFilter)
  testAopPipe(@Query('num', ValidatePipe) num: number) {
    return 'test-aop-pipe' + num;
  }

  // 管道 测试全局级别启用
  @Get('test-global-aop-pipe')
  testGlobalAopPipe(@Query('num') num: number) {
    console.log('test-global-aop-pipe...');
    return 'test-global-aop-pipe' + num;
  }
}
