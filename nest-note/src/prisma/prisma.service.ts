import { Injectable, OnModuleInit } from '@nestjs/common';
// import { Prisma } from '@prisma/client';
import { PrismaClient } from 'prisma/dist/generated-part1/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      // 打印 sql 到控制台
      log: [
        {
          emit: 'stdout',
          level: 'query',
        },
      ],
    });
  }

  async onModuleInit() {
    // 连接数据库
    await this.$connect();
  }
}
