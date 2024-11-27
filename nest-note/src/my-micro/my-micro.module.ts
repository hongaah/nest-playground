import { Module } from '@nestjs/common';
import { MyMicroService } from './my-micro.service';
import { MyMicroController } from './my-micro.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { microServiceConfig } from 'src/my-micro/config/microServiceConfig';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 8888,
        },
      },
    ]),
  ],
  controllers: [MyMicroController],
  providers: [MyMicroService],
})
export class MyMicroModule {}
