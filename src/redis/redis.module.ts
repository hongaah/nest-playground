import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { createClient } from 'redis';

@Module({
  imports: [],
  controllers: [RedisController],
  providers: [
    RedisService,
    {
      // 通过 useFactory 的方式动态创建 provider，token 为 REDIS_CLIENT。
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });
        await client.connect();
        return client;
      },
    },
  ],
})
export class RedisModule {}
