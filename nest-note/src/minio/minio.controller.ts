import { Controller, Get, Inject, Query } from '@nestjs/common';
import { MINIO_CLIENT } from './minio.module';
import * as Minio from 'minio';

@Controller('minio')
export class MinioController {
  @Inject(MINIO_CLIENT)
  private minioClient: Minio.Client;

  @Get('test')
  async test() {
    try {
      await this.minioClient.fPutObject('aaa', 'hello.json', './package.json');
      return 'http://localhost:9000/aaa/hello.json'; // minio 服务生成的文件地址
    } catch (e) {
      console.log(e);
      return '上传失败';
    }
  }

  @Get('presignedUrl')
  async presignedUrl(@Query('name') name: string) {
    // 获取上传地址 presignedPutObject 第一个参数是 bucketName，第二个参数是 objectName 也就是文件名，第三个参数是过期时间，我们指定 3600秒，也就是一小时
    return this.minioClient.presignedPutObject('aaa', name, 3600);
  }
}
