import { Injectable, Inject } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Article } from './entities/article.entity';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class ArticleService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  @Inject(RedisService)
  private redisService: RedisService;

  async findOne(id: number) {
    return await this.entityManager.findOneBy(Article, {
      id,
    });
  }

  async view(id: number, userId: string) {
    const res = await this.redisService.hashGet(`article_${id}`);

    // 先查询 redis，如果没查到就从数据库里查出来返回，并存到 redis 里。
    if (res.viewCount === undefined) {
      const article = await this.findOne(id);

      article.viewCount++;

      await this.entityManager.update(
        Article,
        { id },
        {
          viewCount: article.viewCount,
        },
      );

      await this.redisService.hashSet(`article_${id}`, {
        viewCount: article.viewCount,
        likeCount: article.likeCount,
        collectCount: article.collectCount,
      });

      await this.redisService.set(`user_${userId}_article_${id}`, 1, 3);

      return article.viewCount;
    } else {
      // 查到了就更新 redis 的 viewCount，直接返回 viewCount + 1
      // 用户访问文章的时候在 redis 存一个 10 分钟过期的标记，有这个标记的时候阅读量不增加。
      // 为了测试方便设置 3 秒内只能访问一次
      const flag = await this.redisService.get(`user_${userId}_article_${id}`);

      if (flag) {
        return res.viewCount;
      }

      await this.redisService.hashSet(`article_${id}`, {
        ...res,
        viewCount: +res.viewCount + 1,
      });

      await this.redisService.set(`user_${userId}_article_${id}`, 1, 3);

      return +res.viewCount + 1;
    }
  }

  // 通过定时任务将 redis 里的数据同步到数据库
  // src\task\task.service.ts
  async flushRedisToDB() {
    const keys = await this.redisService.keys(`article_*`);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      const res = await this.redisService.hashGet(key);

      const [, id] = key.split('_');

      await this.entityManager.update(
        Article,
        {
          id: +id,
        },
        {
          viewCount: +res.viewCount,
        },
      );
    }
  }
}
