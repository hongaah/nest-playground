import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MyPassportGithubService } from './my-passport-github.service';

@Controller('my-passport-github')
export class MyPassportGithubController {
  constructor(
    private readonly myPassportGithubService: MyPassportGithubService,
  ) {}

  // localhost:3000/my-passport-github/login
  @Get('login')
  @UseGuards(AuthGuard('github'))
  async login() {}

  // 查询用户信息
  // 访问 http://localhost:3000/my-passport-github/login 会跳转 github 登录，然后授权后会调用 callback接口。
  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req) {
    return this.myPassportGithubService.findUserByGithubId(
      req.user.id,
      req.user,
    );
  }
}
