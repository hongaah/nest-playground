import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Prisma } from '@prisma/client';
import { Prisma } from 'generated-part1/client';

@Injectable()
export class EmployeeService {
  @Inject(PrismaService)
  private prisma: PrismaService;

  async create(data: Prisma.EmployeeCreateInput) {
    return await this.prisma.employee.create({
      data,
      select: {
        id: true,
      },
    });
  }
}
