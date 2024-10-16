import { Global, Module } from '@nestjs/common';
import { MinioController } from './minio.controller';
import * as Minio from 'minio';

export const MINIO_CLIENT = 'MINIO_CLIENT';

@Global()
@Module({
  providers: [
    {
      provide: MINIO_CLIENT,
      async useFactory() {
        const client = new Minio.Client({
          endPoint: 'localhost',
          port: 9000,
          useSSL: false,
          // 通过 docker 起一个 minio 服务后，在 minio 可视化网页创建 accessKey
          accessKey: '',
          secretKey: '',
        });
        return client;
      },
    },
  ],
  exports: [MINIO_CLIENT],
  controllers: [MinioController],
})
export class MinioModule {}
