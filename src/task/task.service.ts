import { Injectable, Inject } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
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
  // @Cron(CronExpression.EVERY_DAY_AT_4AM) // 每天凌晨四点同步
  // async handleCronArtical() {
  //   await this.articleService.flushRedisToDB();
  // }

  // 每三秒执行一次
  // @Interval('task2', 1000 * 60)
  // task2() {
  //   console.log('task2 execute');
  // }

  // 五秒后执行一次
  // @Timeout('task3', 5000)
  // task3() {
  //   console.log('task3 execute');
  // }
}
