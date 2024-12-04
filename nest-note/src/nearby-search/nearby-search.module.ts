import { Module } from '@nestjs/common';
import { NearbySearchService } from './nearby-search.service';
import { NearbySearchController } from './nearby-search.controller';

@Module({
  controllers: [NearbySearchController],
  providers: [NearbySearchService],
})
export class NearbySearchModule {}
