import {
  // Controller,
  Get,
  SetMetadata,
  UseGuards,
  Headers,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  // cutomClass,
  cutomCombindClass,
  customAaaDecorator,
  combineBbb,
  customParam,
  AuthGuard,
  MyHeader,
  MyQuery,
} from './config/index';

// @Controller('custom-decorator')
// @cutomClass()
@cutomCombindClass('custom-decorator', 'aaaa')
export class CustomController {
  // 实现 SetMetadata，后面两种路由都是一个效果
  @Get('common')
  @SetMetadata('roles', 'test 1111')
  @UseGuards(AuthGuard)
  getCommon() {
    return 'common';
  }

  // 自定义装饰器
  @Get('custom')
  @customAaaDecorator('test 2222')
  @UseGuards(AuthGuard)
  getCustom() {
    return 'custom';
  }

  // 组合装饰器
  @combineBbb('combine', 'test 3333')
  getCombine() {
    return 'combine';
  }

  // 自定义参数装饰器
  @Get('customParam')
  getCustomParam(@customParam('send data') param1) {
    console.log(param1);
    return 'customParam';
  }

  // 手写一个 @Headers 参数修饰器
  // 和框架给的 @Headers 功能一样
  @Get('customParamHeaders')
  getCustomParamHeaders(
    @Headers('Accept') header1,
    @MyHeader('Accept') param1,
  ) {
    console.log('header1', header1);
    console.log('param1', param1);
    return 'customParamHeaders';
  }

  // 手写一个 @Query 参数修饰器
  @Get('customParamQuery')
  getCustomParamQuery(
    @Query('param1', new ParseIntPipe()) param1,
    @MyQuery('param2', new ParseIntPipe()) param2,
  ) {
    console.log('param1', param1);
    console.log('param2', param2);
    return 'customParamHeaders';
  }
}
