import { Controller, Get } from '@nestjs/common';
import { PuppeteerBossjdService } from './puppeteer-bossjd.service';

@Controller('puppeteer-bossjd')
export class PuppeteerBossjdController {
  constructor(
    private readonly puppeteerBossjdService: PuppeteerBossjdService,
  ) {}

  // localhost:3000/puppeteer-bossjd/start-spider
  @Get('start-spider')
  startSpider() {
    this.puppeteerBossjdService.startSpider();
    return '爬虫已启动';
  }
}
