import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Query,
} from '@nestjs/common';
import { NearbySearchService } from './nearby-search.service';
import { RedisService } from './redis/redis.service';

@Controller('nearby-search')
export class NearbySearchController {
  constructor(private readonly nearbySearchService: NearbySearchService) {}

  @Inject(RedisService)
  private redisService: RedisService;

  // 添加位置
  // localhost:3000/nearby-search/addPos?name=lisa&longitude=15&latitude=35
  // localhost:3000/nearby-search/addPos?name=rose&longitude=15&latitude=85
  @Get('addPos')
  async addPos(
    @Query('name') posName: string,
    @Query('longitude') longitude: number,
    @Query('latitude') latitude: number,
  ) {
    if (!posName || !longitude || !latitude) {
      throw new BadRequestException('位置信息不全');
    }
    try {
      await this.redisService.geoAdd('positions', posName, [
        longitude,
        latitude,
      ]);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
    return {
      message: '添加成功',
      statusCode: 200,
    };
  }

  // 搜索
  // localhost:3000/nearby-search/allPos
  @Get('allPos')
  async allPos() {
    return this.redisService.geoList('positions');
  }

  // 搜索
  // localhost:3000/nearby-search/pos?name=lisa
  @Get('pos')
  async pos(@Query('name') name: string) {
    return this.redisService.geoPos('positions', name);
  }

  @Get('nearbySearch')
  async nearbySearch(
    @Query('longitude') longitude: number,
    @Query('latitude') latitude: number,
    @Query('radius') radius: number,
  ) {
    if (!longitude || !latitude) {
      throw new BadRequestException('缺少位置信息');
    }
    if (!radius) {
      throw new BadRequestException('缺少搜索半径');
    }

    return this.redisService.geoSearch(
      'positions',
      [longitude, latitude],
      radius,
    );
  }

  @Get()
  getHello(): string {
    return 'I am nearby search';
  }
}
