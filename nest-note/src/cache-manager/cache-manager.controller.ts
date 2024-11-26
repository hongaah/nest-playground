import {
  Controller,
  Inject,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CacheManagerService } from './cache-manager.service';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('cache-manager')
export class CacheManagerController {
  constructor(private readonly cacheManagerService: CacheManagerService) {}

  // CacheManager 目前只支持 get、set
  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  @Get()
  async getHello() {
    return await this.cacheManagerService.getHello();
  }

  @Get('set')
  async set(@Query('value') value: string) {
    await this.cacheManager.set('kkk', value);
    return 'done';
  }

  @Get('get')
  async get() {
    return this.cacheManager.get('kkk');
  }

  @Get('del')
  async del() {
    await this.cacheManager.del('kkk');
    return 'done';
  }

  @Get('aaa')
  @UseInterceptors(CacheInterceptor)
  // 参数不变的情况下，刷新几次，可以看到控制台只打印了一次。因为都是拿的缓存数据，cache-manager 默认是在内存里的。如果想存在 redis，需要配置下 CacheModule.register，使用 cache-manager-redis-store，然后添加下连接配置
  aaa(@Query('a') a: string) {
    console.log('aaa', a);
    return 'aaa';
  }
}
