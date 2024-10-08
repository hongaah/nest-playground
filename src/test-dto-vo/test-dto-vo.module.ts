import { Module } from '@nestjs/common';
import { TestDtoVoService } from './test-dto-vo.service';
import { TestDtoVoController } from './test-dto-vo.controller';
import { MyDtoModule } from './my-dto/my-dto.module';

@Module({
  controllers: [TestDtoVoController],
  providers: [TestDtoVoService],
  imports: [MyDtoModule],
})
export class TestDtoVoModule {}
