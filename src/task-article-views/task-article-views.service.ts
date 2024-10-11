import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskArticleViewsService {
  findAll() {
    return `I am taskArticleViews`;
  }
}
