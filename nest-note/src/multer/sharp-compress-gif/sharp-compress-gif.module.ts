import { Module } from '@nestjs/common';
import { SharpCompressGifService } from './sharp-compress-gif.service';
import { SharpCompressGifController } from './sharp-compress-gif.controller';

@Module({
  controllers: [SharpCompressGifController],
  providers: [SharpCompressGifService],
})
export class SharpCompressGifModule {}
