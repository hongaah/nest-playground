import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../user/entities/role.entity';

declare module 'express' {
  interface Request {
    user: {
      username: string;
      roles: Role[];
    };
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject()
  private reflector: Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    // 如果目标 handler 或者 controller 不包含 require-login 的 metadata，那就放行，否则才检查 jwt。
    const requireLogin = this.reflector.getAllAndOverride('require-login', [
      context.getClass(),
      context.getHandler(),
    ]);
    console.log(requireLogin);
    if (!requireLogin) {
      return true;
    }

    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('用户未登录');
    }

    try {
      const token = authorization.split(' ')[1];

      // 因为 jwt 是用密钥加密的，只要 jwt 能 verify 通过就行了
      const data = this.jwtService.verify(token); // {user: { username: '张三', roles: [ [Object] ] }, iat: 1727350709, exp: 1727955509 }

      // 缓存到 request 中，给后续的 guard 判断有没有权限使用
      request.user = data.user;

      return true;
    } catch (e) {
      // JsonWebTokenError: invalid token
      throw new UnauthorizedException('token 失效，请重新登录');
    }
  }
}
