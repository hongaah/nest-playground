import { Module } from '@nestjs/common';
import { ExecutionContextService } from './execution-context.service';
import { ExecutionContextController } from './execution-context.controller';

@Module({
  controllers: [ExecutionContextController],
  providers: [ExecutionContextService],
})
export class ExecutionContextModule {}
