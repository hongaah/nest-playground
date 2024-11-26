import { Controller, Get, Inject } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { DepartmentService } from './department/department.service';
import { EmployeeService } from './employee/employee.service';

@Controller('prisma')
export class PrismaController {
  constructor(private readonly prismaService: PrismaService) {}

  @Inject(DepartmentService)
  private departmentService: DepartmentService;

  @Inject(EmployeeService)
  private employeeService: EmployeeService;

  @Get()
  getHello(): string {
    return 'Hello Prisma!';
  }

  @Get('create')
  async create() {
    const department = await this.departmentService.create({
      name: '技术部',
    });

    await this.employeeService.create({
      name: '张三',
      phone: '13222222222',
      department: {
        connect: {
          id: department.id,
        },
      },
    });

    return 'done';
  }
}
