import { Module } from '@nestjs/common';
import { GraphqlTodolistService } from './graphql-todolist.service';
import { GraphqlTodolistController } from './graphql-todolist.controller';
import { PrismaService } from './prisma/prisma.service';
import { TodolistResolver } from './todolist.resolver';

@Module({
  controllers: [GraphqlTodolistController],
  providers: [GraphqlTodolistService, PrismaService, TodolistResolver],
})
export class GraphqlTodolistModule {}
