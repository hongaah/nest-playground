# nest cron 定时任务

npm：@nestjs/schedule（时间表）、cron

"cron"（计时程序）是 Linux 系统中的一个任务调度器，它可以定期执行预定的任务，例如定期备份数据、定期执行脚本等。它可以根据用户的设置，在指定的时间间隔内自动执行任务。

主要有三种定时任务：

- @cron() 表达式 CRON 常量
- @Interval 指定任务的执行间隔，参数是毫秒值
- @Timeout 指定多长时间后执行一次

其中 cron 是依赖 cron 包实现的，而 timeout 和 interval 基于 setTimeout、setInterval 的原生 api 封装出来的，所以直接用 clearInterval 和 clearTimeout 来删除。
在 nest 中可以注入 SchedulerRegistery 来对定时任务做增删改查。定时任务里还可以注入 service，来定时执行一些逻辑，在特定业务场景下是很有用的。

## usage

### @cron() 表达式

    @Cron('秒 分 小时 日期 月份 星期 年', options?: CronOptions)

    - 年是可选的，所以一般都是 6 个
    - 星期几除了可以用从 1（星期天） 到 7（星期六） 的数字外，还可以用单词的前三个字母：SUN, MON, TUE, WED, THU, FRI, SAT
    - @Cron 装饰器第二个参数，可以指定定时任务的名字，还有[时区](https://momentjs.com/timezone/)
    - * 代表所有，每个字段都可以写 * ，比如秒写 * 就代表每秒都会触发，日期写 * 就代表每天都会触发。
    - ? 代表忽略，比如当你指定了具体的日期的时候，星期得写 ？，代表忽略星期，同样，指定了星期的时候，日期也可能和它冲突，这时候也要指定 ？。但只有日期和星期可以指定 ？，因为只有这俩字段是相互影响的。
    - - 是范围符号，除了指定一个值外，还可以指定范围，比如分钟指定 20-30
    - / 是步长，比如 0/5，表示从 0 开始，每 5 秒执行一次。
    - L 代表最后一个，比如 L 用在星期的位置就是星期六。L 用在日期的位置就是每月最后一天
    - W 代表工作日，只能用在日期位置，代表从周一到周五，比如 5W，表示本月的第 5 个工作日。
    - # 代表指定，比如 5#3，表示本月的第 3 个星期五。
    - LW 代表最后一个工作日，比如 5LW，表示本月的最后一个工作日。
    - ，可以指定枚举值，通过 , 分隔，比如每小时的第 5 和 第 10 分钟的第 0 秒执行定时任务

🌰：
```ts
@Cron('7 12 13 10 * ?') // 每月 10 号的 13:12:07 执行定时任务
@Cron('0 20-30 * * * *') // 从 20 到 30 的每分钟每个第 0 秒都会执行
@Cron('0 5,10 * * * *') // 每小时的第 5 和 第 10 分钟的第 0 秒执行定时任务
@Cron('* * * L * ?') // 每月的最后一天执行定时任务
@Cron('* * * W * ?') // 每月的工作日 从周一到周五
@Cron('* * * 2W * ?') // 每月的第二个工作日
@Cron('* * * LW * ?') // 每月最后一个工作日
@Cron('* * * ? * 4#3') // 每个月第 3 周的星期三
@Cron('* * * ? * 1#2') // 每个月的第二周的星期天

@Cron('* * * ? * 1#2', { // 指定定时任务的名字，还有时区
  name: 'task1',
  timeZone: 'Asia/Shanghai',
})

```

### Cron 常量

写这样的 cron 表达式还是挺麻烦的，所以 Nest 提供了一些常量可以直接用

### @Interval 指定任务的执行间隔

@Interval(milliseconds: number) 

### @Timeout 指定多长时间后执行一次

@Timeout(milliseconds: number)

## 管理定时任务

```ts: 🌰:src\task\task.module.ts
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from  'cron';

const interval = setInterval(() => {
  console.log('interval job');
}, 3000);
this.schedulerRegistry.getIntervals()
this.schedulerRegistry.getInterval('task2')
this.schedulerRegistry.deleteInterval(item)
this.schedulerRegistry.addInterval('job2', interval)

const timeout = setTimeout(() => {
  console.log('timeout job');
}, 5000);
this.schedulerRegistry.getTimeouts()
this.schedulerRegistry.getTimeout('task3')
this.schedulerRegistry.deleteTimeout(item)
this.schedulerRegistry.addTimeout('job3', timeout)

const job = new CronJob(`0/5 * * * * *`, () => {
  console.log('cron job');
});
this.schedulerRegistry.getCronJobs()
this.schedulerRegistry.getCronJob('task1')
this.schedulerRegistry.deleteCronJob(key)
this.schedulerRegistry.addCronJob('job1', job)
```

## nest 示例

全局注册定时任务后，即可在 service 里使用定时任务。

```ts :src\app.module.ts
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
  ]
})
```

```ts :🌰:src\task\task.service.ts
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
  @Cron(CronExpression.EVERY_DAY_AT_4AM) // 每天凌晨四点同步
  async handleCronArtical() {
    await this.articleService.flushRedisToDB();
  }

  // 每三秒执行一次
  @Interval('task2', 1000 * 60)
  task2() {
    console.log('task2 execute');
  }

  // 五秒后执行一次
  @Timeout('task3', 5000)
  task3() {
    console.log('task3 execute');
  }
}

```