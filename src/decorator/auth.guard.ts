import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

// 卫士 权限判断
@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(Reflector) private readonly reflector: Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('auth check');

    const classMetadata = this.reflector.get('roles', context.getClass());
    const methodMetadata = this.reflector.get('roles', context.getHandler());

    console.log('classMetadata', classMetadata); // [ 'user' ]
    console.log('methodMetadata', methodMetadata); // [ 'admin' ]

    if (methodMetadata) {
      return true;
    }

    return false;
  }
}
