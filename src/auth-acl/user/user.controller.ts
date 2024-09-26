import {
  Controller,
  Get,
  Post,
  Body,
  Session,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';

@UsePipes(ValidationPipe)
@Controller('auth-acl2/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('init')
  async initData() {
    await this.userService.initData();
    return 'done';
  }

  @Post('login')
  async login(@Body() loginUser: LoginUserDto, @Session() session) {
    const user = await this.userService.login(loginUser);

    // 登录成功之后会返回 cookie，之后只要带上这个 cookie 就可以查询到服务端的对应的 session，从而取出 user 信息。
    // 用户登录后，服务端返回 set-cookie 的 header，客户端会自动带上这个 cookie
    session.user = {
      username: user.username,
    };

    return 'success';
  }
}
