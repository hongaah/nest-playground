import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { RedisService as RedisAuthAclService } from 'src/auth-acl/redis/redis.service';
import { RedisService as RedisSessionService } from 'src/redis-session/redis/redis.service';
import { RedisService as RedisEmailService } from 'src/email-login/redis/redis.service';
import { RedisService as RedisViewsService } from 'src/task-article-views/redis/redis.service';
import { RedisService as RedisFllowingService } from 'src/redis-following/redis/redis.service';
import { RedisService as RedisRankingService } from 'src/redis-ranking/redis/redis.service';
import { RedisService as RedisGeoService } from 'src/nearby-search/redis/redis.service';

import { createClient } from 'redis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

@Global()
@Module({
  imports: [],
  controllers: [RedisController],
  providers: [
    RedisService,
    RedisAuthAclService,
    RedisSessionService,
    RedisEmailService,
    RedisViewsService,
    RedisFllowingService,
    RedisRankingService,
    RedisGeoService,
    {
      // 通过 useFactory 的方式动态创建 provider，token 为 REDIS_CLIENT。
      provide: REDIS_CLIENT,
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6379,
          },
          database: 2,
        });
        await client.connect();
        return client;
      },
    },
  ],
  exports: [
    REDIS_CLIENT,
    RedisAuthAclService,
    RedisSessionService,
    RedisEmailService,
    RedisViewsService,
    RedisFllowingService,
    RedisRankingService,
    RedisGeoService,
  ],
})
export class RedisModule {}
