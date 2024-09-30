import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      // https://github.com/settings/developers/ -> OAuth apps
      clientID: 'Ov23liQ3G5iEL6nlOW2X',
      clientSecret: '2fe01ca0d1582d5e8d54dec5ab93cbd7b2936477',
      callbackURL: 'http://localhost:3000/my-passport-github/callback',

      // 请求的数据的范围
      scope: ['public_profile'],
    });
  }

  // passport 的策略会在验证过后把 validate 的返回值放在 request.user 上
  // 这里返回的是用户信息
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('profile', profile);

    return profile;
  }
}
