import { Module } from '@nestjs/common';
import { HttpService } from './http.service';
import { HttpController } from './http.controller';

// http://localhost:3000/static/http.html

@Module({
  controllers: [HttpController],
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {}
