import { Module } from '@nestjs/common';
import { PptGenerateService } from './ppt-generate.service';
import { PptGenerateController } from './ppt-generate.controller';

@Module({
  controllers: [PptGenerateController],
  providers: [PptGenerateService],
})
export class PptGenerateModule {}
