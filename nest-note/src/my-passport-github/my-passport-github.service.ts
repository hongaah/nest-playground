import { Injectable } from '@nestjs/common';
import { Profile } from 'passport-github2';

const users = [
  {
    username: 'hazel',
    githubId: '25690307',
    email: 'xxx@xx.com',
  },
  {
    username: 'xxx',
    email: 'xxx@xx.com',
    hobbies: ['xxx'],
  },
];

@Injectable()
export class MyPassportGithubService {
  findUserByGithubId(githubId: string, githubInfo: Profile) {
    return {
      userInMyApp: users.find((item) => item.githubId === githubId),
      userInGithub: githubInfo,
    };
  }

  getHello(): string {
    return 'Hello World!';
  }
}
