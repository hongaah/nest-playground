import { Module } from '@nestjs/common';
import { AuthAclService } from './auth-acl.service';
import { AuthAclController } from './auth-acl.controller';
import { UserModule } from './user/user.module';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';

@Module({
  controllers: [AuthAclController],
  providers: [AuthAclService],
  imports: [UserModule, AaaModule, BbbModule],
})
export class AuthAclModule {}
