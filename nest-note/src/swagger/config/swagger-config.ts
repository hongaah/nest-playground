import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const startSwagger = (app) => {
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
};
