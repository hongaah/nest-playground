import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaController } from './prisma.controller';
import { DepartmentService } from './department/department.service';
import { EmployeeService } from './employee/employee.service';

@Module({
  controllers: [PrismaController],
  providers: [PrismaService, DepartmentService, EmployeeService],
})
export class PrismaModule {}
