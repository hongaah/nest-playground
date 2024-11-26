import { Inject, Controller, Get } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { TestI18nService } from './test-i18n.service';

@Controller('test-i18n')
export class TestI18nController {
  constructor(private readonly testI18nService: TestI18nService) {}

  @Inject()
  i18n: I18nService;

  // localhost:3000/test-i18n
  // localhost:3000/test-i18n?l=en
  @Get()
  getHello(): string {
    return this.i18n.t('test.hello', {
      lang: I18nContext.current().lang,
    });
  }
}
