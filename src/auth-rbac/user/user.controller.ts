import {
  Controller,
  Inject,
  Get,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from './user.service';

@UsePipes(ValidationPipe)
@Controller('auth-rbac2/user')
export class UserController {
  @Inject(JwtService)
  private jwtService: JwtService;

  constructor(private readonly userService: UserService) {}

  @Get('init')
  async initData() {
    await this.userService.initData();
    return 'done';
  }

  @Post('login')
  async login(@Body() loginUser: UserLoginDto) {
    const user = await this.userService.login(loginUser);

    const token = this.jwtService.sign({
      user: {
        username: user.username,
        roles: user.roles,
      },
    });

    return {
      token,
    };
  }
}
