import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { ArticleModule } from 'src/task-article-views/article/article.module';

@Module({
  imports: [ArticleModule],
  providers: [TaskService],
})
export class TaskModule {}
