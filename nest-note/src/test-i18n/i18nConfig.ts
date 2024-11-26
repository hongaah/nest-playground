import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';

export const i18nConfig = {
  fallbackLanguage: 'en',
  loaderOptions: {
    path: path.join(__dirname, '../i18n'),
    watch: true,
  },
  resolvers: [
    // 文案根据语言环境做了国际化，可以通过以下方式启用
    new QueryResolver(['lang', 'l']),
    new HeaderResolver(['x-custom-lang']),
    new CookieResolver(['lang']),
    AcceptLanguageResolver,
  ],
};
