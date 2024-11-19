import { Module } from '@nestjs/common';
import { RedisFollowingService } from './redis-following.service';
import { RedisFollowingController } from './redis-following.controller';
import { UserModule } from './user/user.module';

@Module({
  controllers: [RedisFollowingController],
  providers: [RedisFollowingService],
  imports: [UserModule],
})
export class RedisFollowingModule {}
