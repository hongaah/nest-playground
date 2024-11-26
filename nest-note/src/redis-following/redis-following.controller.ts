import { Controller } from '@nestjs/common';
import { RedisFollowingService } from './redis-following.service';

@Controller('redis-following')
export class RedisFollowingController {
  constructor(private readonly redisFollowingService: RedisFollowingService) {}
}
