import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('redis-following-2/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // localhost:3000/redis-following-2/user/init
  @Get('init')
  async init() {
    await this.userService.initData();
    return 'done';
  }

  // localhost:3000/redis-following-2/user/follow-relationship?id=5
  @Get('follow-relationship')
  async followRelationShip(@Query('id') id: string) {
    if (!id) {
      throw new BadRequestException('userId 不能为空');
    }
    return this.userService.getFollowRelationship(+id);
  }

  // localhost:3000/redis-following-2/user/follow?id1=3&id2=5
  @Get('follow')
  async follow(@Query('id1') userId1: string, @Query('id2') userId2: string) {
    await this.userService.follow(+userId1, +userId2);
    return 'done';
  }
}
