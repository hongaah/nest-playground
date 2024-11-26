import { Controller, Get } from '@nestjs/common';

/**
 * 方案 2
 *
 * 单独建一个 version 3 的 controller
 *
 */
@Controller({
  path: 'versions',
  version: '3',
})
export class VersionsV3Controller {
  @Get()
  ccc() {
    return 'version c';
  }
}
