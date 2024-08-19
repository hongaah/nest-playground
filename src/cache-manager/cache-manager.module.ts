import { Module } from '@nestjs/common';
import { CacheManagerService } from './cache-manager.service';
import { CacheManagerController } from './cache-manager.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  // imports: [CacheModule.register()],
  imports: [
    CacheModule.register<RedisClientOptions>({
      // @ts-ignore
      store: async () =>
        await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
          // 指定 database为 2，所以在 RedisInsight 里要切到 db2 才可以看到这些数据
          database: 2,
          // 设置缓存过期时间
          ttl: 60 * 60 * 24 * 7, // 7 天
        }),
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [CacheManagerController],
  providers: [CacheManagerService],
})
export class CacheManagerModule {}
