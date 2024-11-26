import { Controller, Get, Param, Req, Session } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('task-article-views-2/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get(':id/view')
  async view(@Param('id') id: string, @Session() session, @Req() req) {
    return await this.articleService.view(+id, session?.user?.id || req.ip);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.articleService.findOne(+id);
  }
}
