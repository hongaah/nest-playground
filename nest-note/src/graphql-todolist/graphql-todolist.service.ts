import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateTodoList } from './dto/todolist-create.dto';
import { UpdateTodoList } from './dto/todolist-update.dto';

@Injectable()
export class GraphqlTodolistService {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  async query() {
    return this.prismaService.todoItem.findMany({
      select: {
        id: true,
        content: true,
        createTime: true,
      },
    });
  }

  async create(todoItem: CreateTodoList) {
    return this.prismaService.todoItem.create({
      data: todoItem,
      select: {
        id: true,
        content: true,
        createTime: true,
      },
    });
  }

  async update(todoItem: UpdateTodoList) {
    return this.prismaService.todoItem.update({
      where: {
        id: todoItem.id,
      },
      data: todoItem,
      select: {
        id: true,
        content: true,
        createTime: true,
      },
    });
  }

  async remove(id: number) {
    return this.prismaService.todoItem.delete({
      where: {
        id,
      },
    });
  }
}
