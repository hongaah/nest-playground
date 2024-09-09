import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomLoggerProvider } from '../../my-logger/CustomLoggerProvider';

// Nest 的底层默认是 Express，所以可以使用 Express 的中间件
// 全局中间件
export const startGlobalMiddleware = (app) => {
  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log('global middleware before', req.url);
    next();
    console.log('global middleware after');
  });
};

// 路由中间件
// Nest 把 Middleware 做成 class，可以实现依赖注入
@Injectable()
export class LogRouteMiddleware implements NestMiddleware {
  @Inject(CustomLoggerProvider) private readonly logger: CustomLoggerProvider;

  use(req: Request, res: Response, next: () => void) {
    this.logger.log(
      `route Middleware before ${req.url}`,
      LogRouteMiddleware.name,
    );
    next();
    this.logger.log('route Middleware after', LogRouteMiddleware.name);
  }
}
