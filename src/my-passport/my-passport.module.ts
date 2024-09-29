import { Module } from '@nestjs/common';
import { MyPassportService } from './my-passport.service';
import { MyPassportController } from './my-passport.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [MyPassportController],
  providers: [MyPassportService],
  imports: [AuthModule, UserModule],
})
export class MyPassportModule {}
