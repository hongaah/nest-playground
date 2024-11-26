import { Module } from '@nestjs/common';
import { TestDtoVoService } from './test-dto-vo.service';
import { TestDtoVoController } from './test-dto-vo.controller';
import { MyDtoModule } from './my-dto/my-dto.module';
import { MyVoModule } from './my-vo/my-vo.module';

@Module({
  controllers: [TestDtoVoController],
  providers: [TestDtoVoService],
  imports: [MyDtoModule, MyVoModule],
})
export class TestDtoVoModule {}
