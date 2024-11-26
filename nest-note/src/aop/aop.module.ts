import { Module } from '@nestjs/common';
import { AopService } from './aop.service';
import { AopController } from './aop.controller';
import { PipeModule } from './pipe/pipe.module';

@Module({
  imports: [PipeModule],
  controllers: [AopController],
  providers: [AopService],
})
export class AopModule {}
