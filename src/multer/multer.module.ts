import { Module } from '@nestjs/common';
import { MulterService } from './multer.service';
import { MulterController } from './multer.controller';
import { LargeFileShardingUploadController } from './large-file-sharding-upload/large-file-sharding-upload.controller';
import { LargeFileShardingUploadModule } from './large-file-sharding-upload/large-file-sharding-upload.module';

@Module({
  controllers: [MulterController, LargeFileShardingUploadController],
  providers: [MulterService],
  imports: [LargeFileShardingUploadModule],
})
export class MulterModule {}
