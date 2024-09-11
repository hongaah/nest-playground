import { Module } from '@nestjs/common';
import { VersionsService } from './versions.service';
import { VersionsController } from './versions.controller';
import { VersionsV3Controller } from './versions-v3.controller';

@Module({
  // controller 之间顺序也很重要，前面的 controller 先生效
  controllers: [VersionsV3Controller, VersionsController],
  providers: [VersionsService],
})
export class VersionsModule {}
