import { Module } from '@nestjs/common';
import { JwtAndSessionService } from './jwt-and-session.service';
import { JwtAndSessionController } from './jwt-and-session.controller';
import { jwtModuleRegiser } from './index';
import { UserModule } from './user/user.module';

@Module({
  imports: [jwtModuleRegiser, UserModule],
  controllers: [JwtAndSessionController],
  providers: [JwtAndSessionService],
})
export class JwtAndSessionModule {}
