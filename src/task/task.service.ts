import { Injectable, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ArticleService } from 'src/task-article-views/article/article.service';

@Injectable()
export class TaskService {
  @Inject(ArticleService)
  private articleService: ArticleService;

  // @Cron(CronExpression.EVERY_10_SECONDS) // 每秒同步
  // handleCron() {
  //   console.log('task execute');
  // }

  // @Cron(CronExpression.EVERY_MINUTE) // 每分钟同步
  @Cron(CronExpression.EVERY_DAY_AT_4AM) // 每天凌晨四点同步
  async handleCronArtical() {
    await this.articleService.flushRedisToDB();
  }
}
