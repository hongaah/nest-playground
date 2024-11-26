import { Module } from '@nestjs/common';
import { LargeFileDownloadService } from './large-file-download.service';
import { LargeFileDownloadController } from './large-file-download.controller';

@Module({
  controllers: [LargeFileDownloadController],
  providers: [LargeFileDownloadService],
})
export class LargeFileDownloadModule {}
