import { Module } from '@nestjs/common';
import { MyVoService } from './my-vo.service';
import { MyVoController } from './my-vo.controller';

@Module({
  controllers: [MyVoController],
  providers: [MyVoService],
})
export class MyVoModule {}
