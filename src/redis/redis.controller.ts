import { Get, Controller } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.redisService.getHello();
  }
}
