import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Query,
  BadRequestException,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { SharpCompressGifService } from './sharp-compress-gif.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync } from 'fs';
// import { Response } from 'express';
import * as sharp from 'sharp';

@Controller('sharp-compress-gif')
export class SharpCompressGifController {
  constructor(
    private readonly sharpCompressGifService: SharpCompressGifService,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return file?.path;
  }

  @Get('compression')
  async compression(
    @Query('path') filePath: string,
    @Query('color', ParseIntPipe) color: number,
    @Query('level', ParseIntPipe) level: number,
    @Res() res: any,
  ) {
    console.log(filePath, color, level);

    if (!existsSync(filePath)) {
      throw new BadRequestException('文件不存在');
    }

    const data = await sharp(filePath, {
      animated: true, // 读取所有的帧，不然默认只会读取 gif 的第一帧
      limitInputPixels: false, // 设为 false 是不限制大小，默认太大的图片是会报错的
    })
      .gif({
        colours: color, // 颜色的数量，默认是 256，一般色彩不丰富的图片，可以把 colours 设置的小一点。
      })
      .toBuffer();

    res.set('Content-Disposition', `attachment; filename="dest.gif"`);

    res.send(data);
  }
}
