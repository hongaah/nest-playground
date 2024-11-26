import { Controller } from '@nestjs/common';
import { RedisRankingService } from './redis-ranking.service';

@Controller('redis-ranking')
export class RedisRankingController {
  constructor(private readonly redisRankingService: RedisRankingService) {}
}
