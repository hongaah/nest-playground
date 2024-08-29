import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { AopModule } from './aop/aop.module';
// import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE, APP_FILTER } from '@nestjs/core';
import {
  LogRouteMiddleware,
  // TimeInterceptor,
  // LoginGuard,
  // ValidatePipe,
  // TestFilter,
} from 'src/aop/concept';
// import { CacheManagerModule } from './cache-manager/cache-manager.module';
// import { MyMongooseModule } from './my-mongoose/my-mongoose.module';
import { DecoratorModule } from './decorator/decorator.module';

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
    AopModule,
    DecoratorModule,
    // CacheManagerModule,
    // MyMongooseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    // 启用全局卫士
    // {
    //   provide: APP_GUARD,
    //   useClass: LoginGuard,
    // },

    // 启用全局拦截器
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TimeInterceptor,
    // },

    // // 启用全局管道
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidatePipe,
    // },

    // // 启用异常过滤器
    // {
    //   provide: APP_FILTER,
    //   useClass: TestFilter,
    // },
  ],
})
export class AppModule implements NestModule {
  // 启用路由中间件，可以配置哪些路由才生效
  configure(consumer: MiddlewareConsumer) {
    const routes = 'test*'; // * | aaa*
    consumer.apply(LogRouteMiddleware).forRoutes(routes);
  }
}
