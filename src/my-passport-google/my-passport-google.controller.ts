import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MyPassportGoogleService } from './my-passport-google.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('my-passport-google')
export class MyPassportGoogleController {
  constructor(
    private readonly myPassportGoogleService: MyPassportGoogleService,
  ) {}

  @Get()
  getHello(): string {
    return this.myPassportGoogleService.getHello();
  }

  // http://localhost:3000/my-passport-google/google
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  /**
   * 首先根据 email 查询 google 方式登录的 user，如果有，就自动登录。否则自动注册然后登录。
   * 这里因为 google 返回的信息是全的，就直接自动注册了。如果不全，需要再跳转一个页面填写其余信息之后再自动注册。
   */
  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const user = await this.myPassportGoogleService.findGoogleUserByEmail(
      req.user.email,
    );

    if (!user) {
      const newUser = this.myPassportGoogleService.registerByGoogleInfo(
        req.user,
      );
      return newUser;
    } else {
      return user;
    }
  }
}
