import { Controller, Get, Inject, Query } from '@nestjs/common';
import { RankingService } from './ranking.service';

@Controller('redis-ranking-2/ranking')
export class RankingController {
  @Inject(RankingService)
  rankingService: RankingService;

  // 模拟用户加入排行榜
  // localhost:3000/redis-ranking-2/ranking/join?name=xxx
  @Get('join')
  async join(@Query('name') name: string) {
    await this.rankingService.join(name);
    return 'success';
  }

  // 模拟用户学习时间
  // localhost:3000/redis-ranking-2/ranking/learn?name=xxx&time=10
  @Get('learn')
  async addLearnTime(@Query('name') name: string, @Query('time') time: string) {
    await this.rankingService.addLearnTime(name, parseFloat(time));
    return 'success';
  }

  // 获取月排行榜
  // localhost:3000/redis-ranking-2/ranking/monthRanking
  @Get('monthRanking')
  async getMonthRanking() {
    return this.rankingService.getMonthRanking();
  }

  // 获取年排行榜
  // localhost:3000/redis-ranking-2/ranking/yearRanking
  @Get('yearRanking')
  async getYearRanking() {
    return this.rankingService.getYearRanking();
  }
}
