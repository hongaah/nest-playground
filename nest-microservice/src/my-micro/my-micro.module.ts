import { Module } from '@nestjs/common';
import { MyMicroService } from './my-micro.service';
import { MyMicroController } from './my-micro.controller';

@Module({
  controllers: [MyMicroController],
  providers: [MyMicroService],
})
export class MyMicroModule {}
