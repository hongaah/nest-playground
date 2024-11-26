// import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
// Nest 底层可以切换 express、fastify 等库，而这些库都会实现一个通用的适配器，就是 HttpAdapter。我们这里用到这个适配器的方法来拿到 requestUrl，比如 /aaa?a=3
import { HttpAdapterHost } from '@nestjs/core';
import { RedisClientType } from 'redis';
import { of, tap } from 'rxjs';
import { REDIS_CLIENT } from 'src/redis/redis.module';

// 手写一个基于 Redis 的 CacheInterceptor，实现缓存接口的功能。
// 多次刷新访问相同的接口，会直接从缓存中取数据，不会执行 handler。
@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
  @Inject(REDIS_CLIENT)
  private redisClient: RedisClientType;

  @Inject(HttpAdapterHost)
  private httpAdapterHost: HttpAdapterHost;

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const key = this.httpAdapterHost.httpAdapter.getRequestUrl(request);
    const value = await this.redisClient.get(key);

    if (!value) {
      // 执行 handler 并且设置到 redis
      return next.handle().pipe(
        tap((res) => {
          this.redisClient.set(key, res);
          // 设置 300 秒后过期
          this.redisClient.expire(key, 300);
        }),
      );
    } else {
      // 这里要返回 rxjs 的 Observable 对象，所以用 of 包一下。
      return of(value);
    }
  }
}
