import {
  Controller,
  Body,
  Post,
  Inject,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('jwt-and-session2/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  // login 是根据 username 和 password 取匹配是否有这个 user
  @Post('login')
  async login(
    @Body(ValidationPipe) user: LoginDto,
    @Res({ passthrough: true }) res: any,
  ) {
    const foundUser = await this.userService.login(user);

    if (foundUser) {
      const token = await this.jwtService.signAsync({
        user: {
          id: foundUser.id,
          username: foundUser.username,
        },
      });
      res.setHeader('token', token);

      return '登录成功';
    } else {
      return '登录失败';
    }
  }

  // register 是把用户信息存到数据库里
  @Post('register')
  async register(@Body(ValidationPipe) user: RegisterDto) {
    return await this.userService.register(user);
  }
}
