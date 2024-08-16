import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { WinstonLogger } from './my-winston-logger/WinstonLogger';
// import { CustomLoggerProvider } from './my-logger/CustomLoggerProvider';
import { WINSTON_LOGGER_TOKEN } from 'src/my-winston-logger/my-winston-logger.module';
import { loggerConfig } from 'src/my-logger/logger-config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // nest 会从 AppModule 开始解析 class 上通过装饰器声明的依赖信息，自动创建和组装对象
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    ...loggerConfig,
  });

  // app.useLogger(app.get(CustomLoggerProvider));
  // app.useLogger(new WinstonLogger());
  app.useLogger(app.get(WINSTON_LOGGER_TOKEN));

  app.useStaticAssets('public', {
    prefix: '/static',
  });

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Test example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('test')
    .addBasicAuth({
      type: 'http',
      name: 'basic',
      description: '用户名 + 密码',
    })
    .addCookieAuth('sid', {
      type: 'apiKey',
      name: 'cookie',
      description: '基于 cookie 的认证',
    })
    .addBearerAuth({
      type: 'http',
      description: '基于 jwt 的认证',
      name: 'bearer',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // 指定在哪个路径可以访问文档
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}

bootstrap();
