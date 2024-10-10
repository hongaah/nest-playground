import {
  Controller,
  Get,
  Query,
  Inject,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { EmailLoginService } from './email-login.service';
import { RedisService } from './redis/redis.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('email-login')
export class EmailLoginController {
  constructor(private readonly emailLoginService: EmailLoginService) {}

  @Inject()
  private redisService: RedisService;

  // http://localhost:3000/email-login/code?address=hongaah@qq.com
  @Get('code')
  async sendEmailCode(@Query('address') address) {
    const code = Math.random().toString().slice(2, 8);

    // 发送验证码之前把将用户邮箱和验证码存入 redis，供后续登录校验
    await this.redisService.set(`captcha_${address}`, code, 60 * 5);

    await this.emailLoginService.sendMail({
      to: address,
      subject: '登录验证码',
      html: `<p>你的登录验证码是 ${code}</p>`,
    });
    return '发送成功';
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { email, code } = loginUserDto;

    const codeInRedis = await this.redisService.get(`captcha_${email}`);
    console.log('codeInRedis', email, codeInRedis);
    if (!codeInRedis) {
      throw new UnauthorizedException('验证码已失效');
    }
    if (code !== codeInRedis) {
      throw new UnauthorizedException('验证码不正确');
    }

    const user = await this.emailLoginService.findUserByEmail(email);

    console.log(user);
    return 'success';
  }
}
