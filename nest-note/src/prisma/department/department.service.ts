import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Prisma } from '@prisma/client';
import { Prisma } from 'prisma/dist/generated-part1/client';

@Injectable()
export class DepartmentService {
  @Inject(PrismaService)
  private prisma: PrismaService;

  // data 的 ts 类型不用自己定义，生成的 client 代码里有
  async create(data: Prisma.DepartmentCreateInput) {
    return await this.prisma.department.create({
      data,
      select: {
        id: true,
      },
    });
  }
}
