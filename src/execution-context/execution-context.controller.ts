import {
  Controller,
  Get,
  UseFilters,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ExecutionContextService } from './execution-context.service';
import { AaaException } from './AaaException';
import { AaaFilter } from './aaa.filter';
import { BbbGuard } from './bbb.guard';
import { Role } from './role';

@Controller('execution-context')
export class ExecutionContextController {
  constructor(
    private readonly executionContextService: ExecutionContextService,
  ) {}

  @Get()
  @UseFilters(AaaFilter)
  @UseGuards(BbbGuard)
  @SetMetadata('roles', Role.Admin)
  getHello(): string {
    throw new AaaException('aaa', 'bbb');
    return this.executionContextService.getHello();
  }
}
