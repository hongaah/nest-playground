import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { CustomLogger } from './my-logger/CustomLogger';
// import { CustomLoggerProvider } from './my-logger/CustomLoggerProvider';

/**
 * logger
 *
 * logger: 是否开启日志，或引用哪个 logger 实例，枚举值：false、['error']、new CustomLogger()
 * bufferLogs: 先不打印日志，把它放到 buffer 缓冲区，直到用 useLogger 指定了 Logger 并且应用初始化完毕
 */
const loggerConfig = {
  // logger: false,
  bufferLogs: true,
};

async function bootstrap() {
  // nest 会从 AppModule 开始解析 class 上通过装饰器声明的依赖信息，自动创建和组装对象
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    ...loggerConfig,
  });

  // app.useLogger(app.get(CustomLoggerProvider));

  app.useStaticAssets('public', {
    prefix: '/static',
  });

  await app.listen(3000);
}

bootstrap();
