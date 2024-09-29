import { Inject, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { IsPublic } from './is-public.decorator';
import { MyPassportService } from './my-passport.service';
import { JwtAuthGuard } from './auth/JwtAuthGuard';
import { AuthGuard } from '@nestjs/passport';
// import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

// interface JwtUserData {
//   userId: number;
//   username: string;
// }

// declare module 'express' {
//   interface Request {
//     user: JwtUserData;
//   }
// }

@Controller('my-passport')
export class MyPassportController {
  constructor(private readonly myPassportService: MyPassportService) {}

  @Inject()
  jwtService: JwtService;

  // 使用 src\my-passport\auth\local.strategy.ts 的策略校验登录
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any) {
    console.log(req.user);

    const token = this.jwtService.sign(
      {
        userId: req.user.userId,
        username: req.user.username,
      },
      {
        expiresIn: '0.5h',
      },
    );

    return {
      token,
    };
  }

  @Get()
  getHello() {
    return this.myPassportService.getHello();
  }

  // 通过 Authorization 的 header 带上 Bearer xxx 的 token 访问才能访问到
  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  list(@Req() req: any) {
    console.log(req.user);
    return ['111', '222', '333', '444', '555'];
  }

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Get('aaa')
  aaa() {
    return 'aaa';
  }

  @Get('bbb')
  @UseGuards(JwtAuthGuard)
  bbb() {
    return 'bbb';
  }
}
