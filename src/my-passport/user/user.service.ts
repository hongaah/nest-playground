import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'xxx',
      password: '111111',
    },
    {
      userId: 2,
      username: 'yyy',
      password: '111111',
    },
  ];

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
