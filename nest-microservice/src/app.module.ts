import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyMicroModule } from './my-micro/my-micro.module';

@Module({
  imports: [MyMicroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
