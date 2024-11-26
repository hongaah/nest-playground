import { Module } from '@nestjs/common';
import { CityWeatherService } from './city-weather.service';
import { CityWeatherController } from './city-weather.controller';
import { httpModuleRegiser } from 'src/httpConfig/index';

@Module({
  imports: [httpModuleRegiser],
  controllers: [CityWeatherController],
  providers: [CityWeatherService],
})
export class CityWeatherModule {}
