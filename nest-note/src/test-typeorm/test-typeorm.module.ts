import { Module } from '@nestjs/common';
import { TestTypeormService } from './test-typeorm.service';
import { TestTypeormController } from './test-typeorm.controller';
import { UserModule } from './user/user.module';
import { CityModule } from './city/city.module';
import { ArticleModule } from './article/article.module';

@Module({
  controllers: [TestTypeormController],
  providers: [TestTypeormService],
  imports: [ArticleModule, UserModule, CityModule],
})
export class TestTypeormModule {}
