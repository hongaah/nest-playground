import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OtherModule } from './other/other.module';
import { XxxModule } from './xxx/xxx.module';
import { PersonModule } from './person/person.module';

// 通过 @Module 声明模块
@Module({
  // nest 还加了模块机制，可以把不同业务的 controller、service 等放到不同模块里。
  // 当 import 别的模块后，那个模块 exports 的 provider 就可以在当前模块注入了。
  imports: [OtherModule, XxxModule, PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
