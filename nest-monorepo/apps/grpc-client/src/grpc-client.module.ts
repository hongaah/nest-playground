import { Module } from '@nestjs/common';
import { GrpcClientController } from './grpc-client.controller';
import { GrpcClientService } from './grpc-client.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BOOK_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:8888',
          package: 'book',
          protoPath: join(__dirname, 'book/book.proto'),
        },
      },
    ]),
  ],
  controllers: [GrpcClientController],
  providers: [GrpcClientService],
})
export class GrpcClientModule {}
