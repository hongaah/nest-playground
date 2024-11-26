import { Module } from '@nestjs/common';
import { HttpService } from './http.service';
import { HttpController } from './http.controller';
import { StreamModule } from './stream/stream.module';
import { WsModule } from './ws/ws.module';

// http://localhost:3000/static/http.html

@Module({
  controllers: [HttpController],
  providers: [HttpService],
  exports: [HttpService],
  imports: [StreamModule, WsModule],
})
export class HttpModule {}
