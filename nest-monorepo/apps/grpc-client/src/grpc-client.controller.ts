import { Controller, Get, Inject, Param } from '@nestjs/common';
import { GrpcClientService } from './grpc-client.service';
import { ClientGrpc } from '@nestjs/microservices';

interface FindById {
  id: number;
}
interface Book {
  id: number;
  name: string;
  desc: string;
}
interface BookService {
  findBook(param: FindById): Book;
}

@Controller()
export class GrpcClientController {
  constructor(private readonly grpcClientService: GrpcClientService) {}

  @Inject('BOOK_PACKAGE')
  private client: ClientGrpc;

  private bookService: BookService;

  @Get()
  getHello(): string {
    return this.grpcClientService.getHello();
  }

  onModuleInit() {
    this.bookService = this.client.getService('BookService');
  }

  @Get('book/:id')
  getHero(@Param('id') id: number) {
    return this.bookService.findBook({
      id,
    });
  }
}
