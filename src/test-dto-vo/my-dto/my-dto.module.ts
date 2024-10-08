import { Module } from '@nestjs/common';
import { MyDtoService } from './my-dto.service';
import { MyDtoController } from './my-dto.controller';

@Module({
  controllers: [MyDtoController],
  providers: [MyDtoService],
})
export class MyDtoModule {}
