import { Module } from '@nestjs/common';
import { TestDtoVoService } from './test-dto-vo.service';
import { TestDtoVoController } from './test-dto-vo.controller';
import { AaaModule } from './aaa/aaa.module';

@Module({
  controllers: [TestDtoVoController],
  providers: [TestDtoVoService],
  imports: [AaaModule],
})
export class TestDtoVoModule {}
