import { Controller, Get } from '@nestjs/common';
import { TaskArticleViewsService } from './task-article-views.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Article } from './article/entities/article.entity';
import { User } from './user/entities/user.entity';

@Controller('task-article-views')
export class TaskArticleViewsController {
  @InjectEntityManager()
  private entityManager: EntityManager;

  constructor(
    private readonly taskArticleViewsService: TaskArticleViewsService,
  ) {}

  @Get()
  findAll() {
    return this.taskArticleViewsService.findAll();
  }

  // localhost:3000/task-article-views/init-data
  @Get('init-data')
  async initData() {
    await this.entityManager.save(User, {
      username: 'xxx',
      password: '111111',
    });
    await this.entityManager.save(User, {
      username: 'yyy',
      password: '222222',
    });

    await this.entityManager.save(Article, {
      title: '基于 Axios 封装一个完美的双 token 无感刷新',
      content: `用户登录之后，会返回一个用户的标识，之后带上这个标识请求别的接口，就能识别出该用户。

      标识登录状态的方案有两种： session 和 jwt。
      `,
    });

    await this.entityManager.save(Article, {
      title: 'Three.js 手写跳一跳小游戏',
      content: `前几年，跳一跳小游戏火过一段时间。

      玩家从一个方块跳到下一个方块，如果没跳过去就算失败，跳过去了就会再出现下一个方块。`,
    });
    return 'done';
  }
}
