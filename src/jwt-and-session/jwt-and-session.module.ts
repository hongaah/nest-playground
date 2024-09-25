import { Module } from '@nestjs/common';
import { JwtAndSessionService } from './jwt-and-session.service';
import { JwtAndSessionController } from './jwt-and-session.controller';
import { jwtModuleRegiser } from './index';

@Module({
  imports: [jwtModuleRegiser],
  controllers: [JwtAndSessionController],
  providers: [JwtAndSessionService],
})
export class JwtAndSessionModule {}
