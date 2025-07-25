import { Controller, Post, Body, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('task-article-views-2/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Session() session) {
    const user = await this.userService.login(loginUserDto);

    session.user = {
      id: user.id,
      username: user.username,
    };

    return 'success';
  }
}
