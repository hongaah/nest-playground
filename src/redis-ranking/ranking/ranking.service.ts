import { RedisService } from './../redis/redis.service';
import { Inject, Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class RankingService {
  @Inject(RedisService)
  redisService: RedisService;

  // 月份的榜单是 learning-ranking-mongth:2024-01、learning-ranking-mongth:2024-02 这样的格式。
  private getMonthKey() {
    const dateStr = dayjs().format('YYYY-MM');
    return `learning-ranking-month:${dateStr}`;
  }

  // 年份的榜单是 learning-ranking-mongth:2023、learning-ranking-mongth:2024 这样的格式。
  private getYearKey() {
    const dateStr = dayjs().format('YYYY');
    return `learning-ranking-year:${dateStr}`;
  }

  async join(name: string) {
    await this.redisService.zAdd(this.getMonthKey(), { [name]: 0 });
  }

  async addLearnTime(name: string, time: number) {
    await this.redisService.zIncr(this.getMonthKey(), name, time);
  }

  async getMonthRanking() {
    return this.redisService.zRankingList(this.getMonthKey(), 0, 10);
  }

  async getYearRanking() {
    const dateStr = dayjs().format('YYYY');
    const keys = await this.redisService.keys(
      `learning-ranking-month:${dateStr}-*`,
    );

    return this.redisService.zUnion(this.getYearKey(), keys);
  }
}
