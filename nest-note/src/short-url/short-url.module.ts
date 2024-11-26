import { Module } from '@nestjs/common';
import { ShortUrlController } from './short-url.controller';
import { UniqueCodeService } from './unique-code.service';
import { ShortLongMapService } from './short-long-map.service';

@Module({
  controllers: [ShortUrlController],
  providers: [UniqueCodeService, ShortLongMapService],
  exports: [ShortLongMapService],
})
export class ShortUrlModule {}
