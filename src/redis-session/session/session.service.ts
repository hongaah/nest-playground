import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis-session/redis/redis.service';

@Injectable()
export class SessionService {
  @Inject(RedisService)
  private redisService: RedisService;

  async setSession(
    sid: string,
    value: Record<string, any>,
    ttl: number = 30 * 60,
  ) {
    if (!sid) {
      sid = this.generateSid();
    }
    await this.redisService.hashSet(`sid_${sid}`, value, ttl);
    return sid;
  }

  // 给 getSession 的类型声明加个重载，否则返回 Record<string, any> 对象类型，但并不知道有什么具体的属性
  async getSession<SessionType extends Record<string, any>>(
    sid: string,
  ): Promise<SessionType>;
  async getSession(sid: string) {
    return await this.redisService.hashGet(`sid_${sid}`);
  }

  generateSid() {
    return Math.random().toString().slice(2, 12);
  }
}
