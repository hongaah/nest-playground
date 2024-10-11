import { Module } from '@nestjs/common';
import { TaskArticleViewsService } from './task-article-views.service';
import { TaskArticleViewsController } from './task-article-views.controller';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';

@Module({
  controllers: [TaskArticleViewsController],
  providers: [TaskArticleViewsService],
  imports: [UserModule, ArticleModule],
})
export class TaskArticleViewsModule {}
