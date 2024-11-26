import {
  Controller,
  Get,
  Query,
  Inject,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { CityWeatherService } from './city-weather.service';
import pinyin from 'pinyin';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('city-weather')
export class CityWeatherController {
  @Inject(HttpService)
  private httpService: HttpService;

  constructor(private readonly cityWeatherService: CityWeatherService) {}

  @Get('pinyin')
  handlePinyin(@Query('text') text: string) {
    return pinyin(text, {
      style: pinyin.STYLE_NORMAL,
    }).join('');
  }

  @Get('weather/:city')
  async weather(@Param('city') city: string) {
    const cityPinyin = pinyin(city, { style: pinyin.STYLE_NORMAL }).join('');

    // 因为 HttpModule 把 axios 的方法返回值封装成了 rxjs 的 Observerable，所以需要使用 rxjs 操作符 firstValueFrom
    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://geoapi.qweather.com/v2/city/lookup?location=${cityPinyin}&key=9d67c06d194c43599c7d6d84323eb29b`,
      ),
    );

    const location = data?.['location']?.[0];

    if (!location) {
      throw new BadRequestException('没有对应的城市信息');
    }

    const { data: weatherData } = await firstValueFrom(
      this.httpService.get(
        `https://devapi.qweather.com/v7/weather/7d?location=${location.id}&key=9d67c06d194c43599c7d6d84323eb29b`,
      ),
    );

    return weatherData;
  }
}
