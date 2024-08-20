import {
  Controller,
  Get,
  Inject,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MyCacheInterceptor } from './my-cache.interceptor';

@Controller()
export class AppController {
  @Inject(AppService) private readonly appService: AppService;

  @Get()
  getHello(): string {
    return this.appService.getGlobalHello();
  }

  // 可通过控制台和 RedisInsight 验证
  @Get('test-cache-manager-redis')
  @UseInterceptors(MyCacheInterceptor)
  testCacheManagerRedis(@Query('key') key: string) {
    console.log('test-cache-manager-redis', key);
    return 'test-cache-manager-redis key: ' + key;
  }
}
