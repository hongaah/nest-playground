import { Module } from '@nestjs/common';
import { PuppeteerBossjdService } from './puppeteer-bossjd.service';
import { PuppeteerBossjdController } from './puppeteer-bossjd.controller';

@Module({
  controllers: [PuppeteerBossjdController],
  providers: [PuppeteerBossjdService],
})
export class PuppeteerBossjdModule {}
