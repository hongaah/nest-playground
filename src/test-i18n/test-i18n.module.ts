import { Module } from '@nestjs/common';
import { TestI18nService } from './test-i18n.service';
import { TestI18nController } from './test-i18n.controller';
import { I18nModule } from 'nestjs-i18n';
import { i18nConfig } from 'src/test-i18n/i18nConfig';
import { UserModule } from './user/user.module';

@Module({
  // 局部配置，最好是在 appModule 全局配置，这样其他模块也可以使用i18n
  imports: [I18nModule.forRoot(i18nConfig), UserModule],
  controllers: [TestI18nController],
  providers: [TestI18nService],
})
export class TestI18nModule {}
