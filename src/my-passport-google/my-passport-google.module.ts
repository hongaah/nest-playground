import { Module } from '@nestjs/common';
import { MyPassportGoogleService } from './my-passport-google.service';
import { MyPassportGoogleController } from './my-passport-google.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [MyPassportGoogleController],
  providers: [MyPassportGoogleService],
  imports: [AuthModule],
})
export class MyPassportGoogleModule {}
