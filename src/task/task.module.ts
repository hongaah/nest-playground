import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { TaskService } from './task.service';
import { ArticleModule } from 'src/task-article-views/article/article.module';
import { SchedulerRegistry } from '@nestjs/schedule';
// import { CronJob } from 'cron';

@Module({
  imports: [ArticleModule],
  providers: [TaskService],
})
export class TaskModule implements OnApplicationBootstrap {
  @Inject(SchedulerRegistry)
  private schedulerRegistry: SchedulerRegistry;

  onApplicationBootstrap() {
    // 管理定时任务

    /** 删除所有类型的任务 */
    console.log('--- 删除所有定时任务 ---');

    const crons = this.schedulerRegistry.getCronJobs();
    crons.forEach((item, key) => {
      // 停掉 CronJob
      item.stop();
      this.schedulerRegistry.deleteCronJob(key);
    });

    const intervals = this.schedulerRegistry.getIntervals();
    intervals.forEach((item) => {
      const interval = this.schedulerRegistry.getInterval(item);

      // timeout 和 interval 基于 setTimeout、setInterval 的原生 api 封装出来的，所以直接用 clearInterval 和 clearTimeout 来删除
      clearInterval(interval);

      this.schedulerRegistry.deleteInterval(item);
    });

    const timeouts = this.schedulerRegistry.getTimeouts();
    timeouts.forEach((item) => {
      const timeout = this.schedulerRegistry.getTimeout(item);
      // 删除定时器
      clearTimeout(timeout);

      this.schedulerRegistry.deleteTimeout(item);
    });

    // console.log(this.schedulerRegistry.getCronJobs());
    // console.log(this.schedulerRegistry.getIntervals());
    // console.log(this.schedulerRegistry.getTimeouts());

    /** 添加定时任务 */
    // console.log('--- 添加定时任务 ---');
    // const job = new CronJob(`0/5 * * * * *`, () => {
    //   console.log('cron job');
    // });

    // this.schedulerRegistry.addCronJob('job1', job);
    // job.start();

    // const interval = setInterval(() => {
    //   console.log('interval job');
    // }, 3000);
    // this.schedulerRegistry.addInterval('job2', interval);

    // const timeout = setTimeout(() => {
    //   console.log('timeout job');
    // }, 5000);
    // this.schedulerRegistry.addTimeout('job3', timeout);
  }
}
