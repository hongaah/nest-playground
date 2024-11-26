import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from './role';

@Injectable()
export class CccInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    /**
     * ExecutionContext
     */

    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    console.log(requiredRoles);

    return next.handle();
  }
}
