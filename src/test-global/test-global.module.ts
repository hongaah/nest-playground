import { Module } from '@nestjs/common';
import { TestGlobalService } from './test-global.service';
import { TestGlobalController } from './test-global.controller';
import { MyLoggerModule } from '../my-logger/my-logger.module';

@Module({
  imports: [
    // 导入一个动态模块，logger
    MyLoggerModule.register({
      x: 1,
      y: 2,
    }),
  ],
  controllers: [TestGlobalController],
  providers: [TestGlobalService],
})
export class TestGlobalModule {}
