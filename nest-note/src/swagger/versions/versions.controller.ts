import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { VersionsService } from './versions.service';

@Controller({
  path: 'versions',
  // version: '1', // 设置所有接口都是版本1
  version: ['1'], // 设置接口为版本1
  // version: VERSION_NEUTRAL, // 解决只有显式声明版本才能访问接口
})
export class VersionsController {
  constructor(private readonly versionsService: VersionsService) {}

  /**
   * 方案 1
   *
   * 同一个 controller 文件里特殊处理该路由为版本2；
   * 设置了 VERSION_NEUTRAL 版本后，因为是从上到下匹配，所以版本2要提前声明
   *
   */
  @Version('2')
  @Get()
  bbb() {
    return 'version b';
  }

  @Get()
  aaa() {
    return 'version a';
  }
}
