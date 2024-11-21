import { Module } from '@nestjs/common';
import { RedisRankingService } from './redis-ranking.service';
import { RedisRankingController } from './redis-ranking.controller';
import { RankingModule } from './ranking/ranking.module';

@Module({
  controllers: [RedisRankingController],
  providers: [RedisRankingService],
  imports: [RankingModule],
})
export class RedisRankingModule {}
