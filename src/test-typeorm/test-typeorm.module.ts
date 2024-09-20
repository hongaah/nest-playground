import { Module } from '@nestjs/common';
import { TestTypeormService } from './test-typeorm.service';
import { TestTypeormController } from './test-typeorm.controller';
import { UserModule } from './user/user.module';

@Module({
  controllers: [TestTypeormController],
  providers: [TestTypeormService],
  imports: [UserModule],
})
export class TestTypeormModule {}
