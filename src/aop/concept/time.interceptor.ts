import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

// interceptor
@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 和 middleware 的区别：interceptor 可以拿到调用的 controller 和 handler
    console.log(context.getClass(), context.getHandler());

    const startTime = Date.now();

    // 调用 next.handle() 就会调用目标 Controller
    // Controller 之前之后的处理逻辑可能是异步的。Nest 里通过 rxjs 来组织它们，所以可以使用 rxjs 的各种 operator。
    return next.handle().pipe(
      tap(() => {
        console.log('time: ', Date.now() - startTime);
      }),
    );
  }
}
