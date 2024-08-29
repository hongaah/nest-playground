import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { WinstonLogger } from './my-winston-logger/WinstonLogger';
// import { CustomLoggerProvider } from './my-logger/CustomLoggerProvider';
import { WINSTON_LOGGER_TOKEN } from 'src/my-winston-logger/my-winston-logger.module';
import { loggerConfig } from 'src/my-logger/config/logger-config';
import { startSwagger } from 'src/swagger/config/swagger-config';
// import { startGlobalMiddleware, TimeInterceptor, LoginGuard, ValidatePipe, TestFilter } from 'src/aop/concept';

async function bootstrap() {
  // nest 会从 AppModule 开始解析 class 上通过装饰器声明的依赖信息，自动创建和组装对象
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    ...loggerConfig,
  });

  /** 日志 */
  // app.useLogger(app.get(CustomLoggerProvider));
  // app.useLogger(new WinstonLogger());
  app.useLogger(app.get(WINSTON_LOGGER_TOKEN));

  /** 静态资源 */
  app.useStaticAssets('public', {
    prefix: '/static',
  });

  /** swagger */
  startSwagger(app);

  /** AOP */
  // // 全局中间件
  // startGlobalMiddleware(app);
  // // 全局卫视
  // app.useGlobalGuards(new LoginGuard());
  // // 全局拦截器
  // app.useGlobalInterceptors(new TimeInterceptor());
  // // 全局管道
  // app.useGlobalPipes(new ValidatePipe());
  // 全局错误拦截器
  // app.useGlobalFilters(new TestFilter());

  await app.listen(3000);
}

bootstrap();
