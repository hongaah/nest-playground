import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '480901921965-s42tk15t3kc9e399s7pb5du8fknenu38.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/my-passport-google/callback',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };

    console.log('profile', profile);
    return user;
  }
}
