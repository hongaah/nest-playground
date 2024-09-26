import { Module } from '@nestjs/common';
import { AuthRbacService } from './auth-rbac.service';
import { AuthRbacController } from './auth-rbac.controller';
import { UserModule } from './user/user.module';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';

@Module({
  controllers: [AuthRbacController],
  providers: [AuthRbacService],
  imports: [UserModule, AaaModule, BbbModule],
})
export class AuthRbacModule {}
