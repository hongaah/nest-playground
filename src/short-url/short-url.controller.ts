import {
  Controller,
  Get,
  Inject,
  Query,
  Redirect,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { ShortLongMapService } from './short-long-map.service';

@Controller('short-url')
export class ShortUrlController {
  @Inject(ShortLongMapService) private shortLongMapService: ShortLongMapService;

  // 注意：url 的值需为完整绝对路径
  // http://localhost:3000/short-url/get/?url=https://www.baidu.com/
  @Get('get')
  async generateShortUrl(@Query('url') longUrl) {
    return this.shortLongMapService.generate(longUrl);
  }

  // http://localhost:3000/short-url/jump/4sreB1
  @Get('jump/:code')
  @Redirect()
  async jump(@Param('code') code) {
    const longUrl = await this.shortLongMapService.getLongUrl(code);
    if (!longUrl) {
      throw new BadRequestException('短链不存在');
    }
    return {
      url: longUrl,
      statusCode: 302,
    };
  }
}
