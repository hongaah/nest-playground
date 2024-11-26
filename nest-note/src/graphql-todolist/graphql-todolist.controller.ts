import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GraphqlTodolistService } from './graphql-todolist.service';
import { CreateTodoList } from './dto/todolist-create.dto';
import { UpdateTodoList } from './dto/todolist-update.dto';

@Controller('graphql-todolist')
export class GraphqlTodolistController {
  constructor(
    private readonly graphqlTodolistService: GraphqlTodolistService,
  ) {}

  @Get()
  getHello(): string {
    return 'Hello GraphqlTodolistController!';
  }

  // localhost:3000/graphql-todolist/create
  @Post('create')
  async create(@Body() todoItem: CreateTodoList) {
    return this.graphqlTodolistService.create(todoItem);
  }

  @Post('update')
  async update(@Body() todoItem: UpdateTodoList) {
    return this.graphqlTodolistService.update(todoItem);
  }

  @Get('delete')
  async delete(@Query('id') id: number) {
    return this.graphqlTodolistService.remove(+id);
  }

  // localhost:3000/graphql-todolist/list
  @Get('list')
  async list() {
    return this.graphqlTodolistService.query();
  }
}
