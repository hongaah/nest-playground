import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { Permission } from '../user/entities/permission.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    // 因为这个 PermissionGuard 在 LoginGuard 之后调用（在 AppModule 里声明在 LoginGuard 之后），所以走到这里 request 里就有 user 对象了。
    if (!request.user) {
      return true;
    }

    // 取出 user 的 roles 的 id，查出 roles 的 permission 信息，然后合并到 permissions 数组里
    const roles = await this.userService.findRolesByIds(
      request.user.roles.map((item) => item.id),
    );

    // 用户的权限
    const permissions: Permission[] = roles.reduce((total, current) => {
      total.push(...current.permissions);
      return total;
    }, []);
    console.log(permissions);

    // 该接口需要的权限
    const requiredPermissions =
      this.reflector.getAllAndOverride<string[]>('require-permission', [
        context.getClass(),
        context.getHandler(),
      ]) ?? [];
    console.log(requiredPermissions);

    // 判断用户有无该接口的权限
    for (let i = 0; i < requiredPermissions.length; i++) {
      const curPermission = requiredPermissions[i];
      const found = permissions.find((item) => item.name === curPermission);
      if (!found) {
        throw new UnauthorizedException('您没有访问该接口的权限');
      }
    }

    return true;
  }
}
