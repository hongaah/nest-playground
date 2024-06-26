import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from './http/http.module';
import { ProviderModule } from './provider/provider.module';
import { LifecycleModule } from './lifecycle/lifecycle.module';

@Module({
  imports: [HttpModule, ProviderModule, LifecycleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
