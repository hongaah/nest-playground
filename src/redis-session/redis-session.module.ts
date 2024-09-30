import { Module } from '@nestjs/common';
import { RedisSessionService } from './redis-session.service';
import { RedisSessionController } from './redis-session.controller';
import { SessionModule } from './session/session.module';

@Module({
  controllers: [RedisSessionController],
  providers: [RedisSessionService],
  imports: [SessionModule],
})
export class RedisSessionModule {}
