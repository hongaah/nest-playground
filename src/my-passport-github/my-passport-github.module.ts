import { Module } from '@nestjs/common';
import { MyPassportGithubService } from './my-passport-github.service';
import { MyPassportGithubController } from './my-passport-github.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [MyPassportGithubController],
  providers: [MyPassportGithubService],
  imports: [AuthModule],
})
export class MyPassportGithubModule {}
