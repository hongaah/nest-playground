import { Module } from '@nestjs/common';
import { MulterService } from './multer.service';
import { MulterController } from './multer.controller';
import { LargeFileShardingUploadController } from './large-file-sharding-upload/large-file-sharding-upload.controller';
import { LargeFileShardingUploadModule } from './large-file-sharding-upload/large-file-sharding-upload.module';
import { SharpCompressGifModule } from './sharp-compress-gif/sharp-compress-gif.module';
import { LargeFileDownloadModule } from './large-file-download/large-file-download.module';

@Module({
  controllers: [MulterController, LargeFileShardingUploadController],
  providers: [MulterService],
  imports: [
    LargeFileShardingUploadModule,
    SharpCompressGifModule,
    LargeFileDownloadModule,
  ],
})
export class MulterModule {}
