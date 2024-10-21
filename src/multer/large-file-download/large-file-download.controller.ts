import { Controller, Get, Res, Header, StreamableFile } from '@nestjs/common';
import { LargeFileDownloadService } from './large-file-download.service';
// import { Response } from 'express';
import * as fs from 'fs';

@Controller('large-file-download')
export class LargeFileDownloadController {
  constructor(
    private readonly largeFileDownloadService: LargeFileDownloadService,
  ) {}

  @Get()
  getHello(): string {
    return 'I am large-file-download';
  }

  // localhost:3000/large-file-download/download
  @Get('download')
  download(@Res() res: any) {
    const content = fs.readFileSync('package.json');

    res.set('Content-Disposition', `attachment; filename="clonePackage.json"`);

    res.end(content);
  }

  @Get('download1')
  @Header('Content-Disposition', `attachment; filename="clonePackage1.json"`)
  download1(@Res() res: any) {
    const content = fs.readFileSync('package.json');

    res.end(content);
  }

  // 流式传输
  // localhost:3000/large-file-download/download2
  @Get('download2')
  download2() {
    const stream = fs.createReadStream('package.json');

    /**
     * StreamableFile
     *
     * node 的 stream 本来就是分块读取内容的，这里配合流式返回数据更合适。
     * 不过在 nest 里最好不要直接用 node 的 stream api。因为它有很多事件，比如 data、error、end 等，自己处理还是挺麻烦的。
       // stream.on('data', (chunk) => {})
       // stream.pipe(res);

       StreamableFile 返回的接口响应 header 会有 transfer-encoding:chunked
     */
    return new StreamableFile(stream, {
      type: 'text/plain', // 默认是 octet-stream，即 Content-Type 默认是 application/octet-stream 二进制流
      disposition: `attachment; filename="clonePackage2.json"`,
    });
  }

  // 流式传输 TODO：抓包验证下
  // localhost:3000/large-file-download/download3
  @Get('download3')
  @Header('transfer-encoding', `chunked`)
  @Header('Content-Disposition', `attachment; filename="clonePackage1.json"`)
  download3(@Res() res: any) {
    const content = fs.readFileSync('package.json');

    res.end(content);
  }
}
