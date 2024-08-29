import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// Nest 的底层是 Express，所以可以使用 Express 的中间件
// 全局中间件
export const startGlobalMiddleware = (app) => {
  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log('global middleware before', req.url);
    next();
    console.log('global middleware after');
  });
};

// 路由中间件
@Injectable()
export class LogRouteMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('route Middleware before', req.url);
    next();
    console.log('route Middleware after');
  }
}
