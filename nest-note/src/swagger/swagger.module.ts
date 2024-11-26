import { Module } from '@nestjs/common';
import { SwaggerService } from './swagger.service';
import { SwaggerController } from './swagger.controller';
import { VersionsModule } from './versions/versions.module';

@Module({
  controllers: [SwaggerController],
  providers: [SwaggerService],
  imports: [VersionsModule],
})
export class SwaggerModule {}
