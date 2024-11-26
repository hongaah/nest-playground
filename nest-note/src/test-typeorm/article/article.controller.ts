import { Controller, Get } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('test-typeorm-2/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get('init-data')
  async initData() {
    await this.articleService.initData();
    return 'done';
  }

  @Get('get-all')
  findAll() {
    return this.articleService.findAll();
  }
}
