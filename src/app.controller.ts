import {
  Controller,
  Get,
  Inject,
  Query,
  UseInterceptors,
  Redirect,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MyCacheInterceptor } from './my-cache.interceptor';
import { ShortLongMapService } from 'src/short-url/short-long-map.service';

@Controller()
export class AppController {
  @Inject(AppService) private readonly appService: AppService;
  @Inject(ShortLongMapService) private shortLongMapService: ShortLongMapService;

  @Get()
  getHello(): string {
    return this.appService.getGlobalHello();
  }

  // 短链服务
  @Get(':code')
  @Redirect()
  async jump(@Param('code') code) {
    const longUrl = await this.shortLongMapService.getLongUrl(code);
    if (!longUrl) {
      throw new BadRequestException('短链不存在');
    }
    return {
      url: longUrl,
      statusCode: 302,
    };
  }

  // 可通过控制台和 RedisInsight 验证
  @Get('test-cache-manager-redis')
  @UseInterceptors(MyCacheInterceptor)
  testCacheManagerRedis(@Query('key') key: string) {
    console.log('test-cache-manager-redis', key);
    return 'test-cache-manager-redis key: ' + key;
  }
}
