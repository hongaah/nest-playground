import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
// import { WinstonLogger } from './my-winston-logger/WinstonLogger';
// import { CustomLoggerProvider } from './my-logger/CustomLoggerProvider';
import { WINSTON_LOGGER_TOKEN } from 'src/my-winston-logger/my-winston-logger.module';
import { loggerConfig } from 'src/my-logger/config/logger-config';
import { startSwagger } from 'src/swagger/config/swagger-config';
// import { startGlobalMiddleware, TimeInterceptor, LoginGuard, ValidatePipe, TestFilter } from 'src/aop/concept';
import { sessionHandler } from 'src/decorator/config';
import { useSession } from './jwt-and-session/index';

async function bootstrap() {
  // nest 会从 AppModule 开始解析 class 上通过装饰器声明的依赖信息，自动创建和组装对象

  /** express */
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    ...loggerConfig,
    // cors: true, // 支持跨域 ①
  });
  app.enableCors(); // 支持跨域 ②

  /** fastify */
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter(),
  // );

  /** 日志 */
  // app.useLogger(app.get(CustomLoggerProvider));
  // app.useLogger(new WinstonLogger());
  app.useLogger(app.get(WINSTON_LOGGER_TOKEN));

  /** 静态资源 */
  app.useStaticAssets('public', {
    prefix: '/static',
  });

  /** 模板引擎 */
  app.setBaseViewsDir('views');
  app.setViewEngine('hbs'); // ejs hbs pug

  /** swagger */
  startSwagger(app);

  /** 支持多版本接口 */
  app.enableVersioning({
    type: VersioningType.URI,
  });

  /** session */
  // app.use(sessionHandler());
  app.use(useSession());

  /** AOP */
  // // 全局中间件
  // startGlobalMiddleware(app);
  // // 全局卫视
  // app.useGlobalGuards(new LoginGuard());
  // // 全局拦截器
  // app.useGlobalInterceptors(new TimeInterceptor());
  // // 全局管道
  // app.useGlobalPipes(new ValidatePipe());
  // // 全局错误拦截器
  // app.useGlobalFilters(new TestFilter());

  await app.listen(3000);
}

bootstrap();
