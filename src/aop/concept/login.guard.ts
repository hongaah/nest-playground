import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomLoggerProvider } from '../../my-logger/CustomLoggerProvider';

// 卫视 权限判断
@Injectable()
export class LoginGuard implements CanActivate {
  // 当 Guard 在 IoC 容器里，可以注入其他 Provider
  @Inject(CustomLoggerProvider) private logger: CustomLoggerProvider;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log('login check', LoginGuard.name);
    return false;
  }
}
