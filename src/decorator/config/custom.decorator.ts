import {
  Controller,
  applyDecorators,
  Get,
  UseGuards,
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from './index';
import { Request } from 'express';

// 自定义 class 装饰器
export const cutomClass = () => Controller('custom-class');

// 自定义 class 组合装饰器
export const cutomCombindClass = (path, metadata) => {
  return applyDecorators(Controller(path), SetMetadata('roles', metadata));
};

// 自定义 handler 装饰器
export const customAaaDecorator = (...args: string[]) => {
  return SetMetadata('roles', args);
};

// 合并多个 handler 装饰器
export function combineBbb(path, role) {
  return applyDecorators(
    Get(path),
    customAaaDecorator(role),
    UseGuards(AuthGuard),
  );
}

// 自定义参数装饰器
export const customParam = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    // data: 传入的参数 ExecutionContext: 可以取出 request、response 对象
    console.log('传入参数', data);
    return 'ccc';
  },
);

// 手写一个 @Headers 参数装饰器
export const MyHeader = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return key ? request.headers[key.toLowerCase()] : request.headers;
  },
);

// 手写一个 @Query 参数装饰器
export const MyQuery = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.query[key];
  },
);
