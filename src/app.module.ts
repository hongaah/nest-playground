import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule as MyHttpModule } from './http/http.module';
import { ProviderModule } from './provider/provider.module';
import { LifecycleModule } from './lifecycle/lifecycle.module';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { TestGlobalModule } from './test-global/test-global.module';
import { MyWinstonLoggerModule } from './my-winston-logger/my-winston-logger.module';
import { SwaggerModule } from './swagger/swagger.module';
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
import { ExecutionContextModule } from './execution-context/execution-context.module';
import { CircularDependencyModule } from './circular-dependency/circular-dependency.module';
import { DynamicModuleModule } from './dynamic-module/dynamic-module.module';
import { MulterModule } from './multer/multer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TestTypeormModule } from './test-typeorm/test-typeorm.module';
import { TestEnvModule } from './test-env/test-env.module';
import { JwtAndSessionModule } from './jwt-and-session/jwt-and-session.module';
import { AppDataSource } from 'src/puppeteer-bossjd/config/data-source.boss';
import { AuthAclModule } from './auth-acl/auth-acl.module';
import { AuthRbacModule } from './auth-rbac/auth-rbac.module';
import { MyPassportModule } from './my-passport/my-passport.module';
import { MyPassportGithubModule } from './my-passport-github/my-passport-github.module';
import { MyPassportGoogleModule } from './my-passport-google/my-passport-google.module';
import { RedisSessionModule } from './redis-session/redis-session.module';
import { TestDtoVoModule } from './test-dto-vo/test-dto-vo.module';
import { EmailLoginModule } from './email-login/email-login.module';
import { TaskArticleViewsModule } from './task-article-views/task-article-views.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TestEventEmitterModule } from './test-event-emitter/test-event-emitter.module';
import { CityWeatherModule } from './city-weather/city-weather.module';
import { ShortUrlModule } from './short-url/short-url.module';
// import { MinioModule } from './minio/minio.module';
import { PuppeteerBossjdModule } from './puppeteer-bossjd/puppeteer-bossjd.module';
import { QrcodeLoginModule } from './qrcode-login/qrcode-login.module';
import { PptGenerateModule } from './ppt-generate/ppt-generate.module';
import { ServerStatusModule } from './server-status/server-status.module';
import { TestI18nModule } from './test-i18n/test-i18n.module';
import { I18nModule } from 'nestjs-i18n';
import { i18nConfig } from 'src/test-i18n/i18nConfig';
import { SocketChatroomModule } from './socket-chatroom/socket-chatroom.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource),
    I18nModule.forRoot(i18nConfig),
    // TestTypeormModule,
    MyHttpModule,
    ProviderModule,
    LifecycleModule,
    MyLoggerModule,
    TestGlobalModule,
    MyWinstonLoggerModule,
    SwaggerModule,
    RedisModule,
    AopModule,
    DecoratorModule,
    ExecutionContextModule,
    CircularDependencyModule,
    DynamicModuleModule.register({}),
    MulterModule,
    // DynamicBuilderModule.register({
    //   aaa: 0,
    //   bbb: '',
    // }),
    // CacheManagerModule,
    // MyMongooseModule,
    TestEnvModule,
    JwtAndSessionModule,
    AuthAclModule,
    AuthRbacModule,
    MyPassportModule,
    MyPassportGithubModule,
    MyPassportGoogleModule,
    RedisSessionModule,
    TestDtoVoModule,
    EmailLoginModule,
    TaskArticleViewsModule,
    TaskModule,
    TestEventEmitterModule,
    CityWeatherModule,
    ShortUrlModule,
    PuppeteerBossjdModule,
    QrcodeLoginModule,
    PptGenerateModule,
    ServerStatusModule,
    TestI18nModule,
    SocketChatroomModule,
    // MinioModule,
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
