import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// 指定从 request 的 header 里提取 token，然后取出 payload 之后会传入 validate 方法做验证，返回的值同样会设置到 request.user
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'hazel',
    });
  }

  // 自定义校验规则
  async validate(payload: any) {
    return { userId: payload.userId, username: payload.username };
  }
}
