import {
  Controller,
  Get,
  Session,
  Inject,
  Res,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAndSessionService } from './jwt-and-session.service';
import { JwtService } from '@nestjs/jwt';
// import { Response } from 'express'; // Module not found: Error: Can't resolve 'express'

@Controller('jwt-and-session')
export class JwtAndSessionController {
  constructor(private readonly jwtAndSessionService: JwtAndSessionService) {}

  @Inject(JwtService) private jwtService: JwtService;

  // http 请求从无状态变得有状态了 累加 count 值
  @Get('sss')
  sss(@Session() session) {
    console.log(session);

    session.count = session.count ? session.count + 1 : 1;
    return session.count;
  }

  // jwt
  // http://localhost:3000/static/jwtandsession.html
  @Get('ttt')
  ttt(
    @Headers('authorization') authorization: string,
    @Res({ passthrough: true }) response: any,
  ) {
    // 携带 jwt 需要加载 authorization 的 header 里，以 Bearer xxx 的格式，但是返回 jwt 可以放在任何地方，header、cookie 或者 body 里都可以。
    if (authorization) {
      try {
        const token = authorization.split(' ')[1];
        const data = this.jwtService.verify(token);
        console.log('data', data);

        // 使用 jwtService.sign 每次都生成一个新的 jwt token
        const newToken = this.jwtService.sign({
          count: data.count + 1,
        });
        response.setHeader('token', newToken);
        return data.count + 1;
      } catch (e) {
        console.log(e);
        throw new UnauthorizedException();
      }
    } else {
      const newToken = this.jwtService.sign({
        count: 1,
      });

      response.setHeader('token', newToken);
      return 1;
    }
  }
}
