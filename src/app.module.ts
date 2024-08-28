import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from './http/http.module';
import { ProviderModule } from './provider/provider.module';
import { LifecycleModule } from './lifecycle/lifecycle.module';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { TestGlobalModule } from './test-global/test-global.module';
import { MyWinstonLoggerModule } from './my-winston-logger/my-winston-logger.module';
// import { SwaggerModule } from './swagger/swagger.module';
import { RedisModule } from './redis/redis.module';
// import { CacheManagerModule } from './cache-manager/cache-manager.module';
// import { MyMongooseModule } from './my-mongoose/my-mongoose.module';

@Module({
  imports: [
    HttpModule,
    ProviderModule,
    LifecycleModule,
    MyLoggerModule,
    TestGlobalModule,
    MyWinstonLoggerModule,
    // SwaggerModule,
    RedisModule,
    // CacheManagerModule,
    // MyMongooseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
