import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { HttpModule } from 'src/http/http.module';

// http://localhost:3000/provider

/**
 * @Module 声明模块
 *
 * 模块机制，可以把不同业务的 controller、service 等放到不同模块里。
 * 当 import 别的模块后，那个模块 exports 的 provider 就可以在当前模块注入了，然后才能使用起来。
 * Nest 会自动对 providers 做实例化后用来注入。
 */
@Module({
  imports: [HttpModule],
  controllers: [ProviderController],
  // provider 是通过 @Injectable 声明，然后在 @Module 的 providers 数组里注册的 class。
  providers: [
    // 直接指定 class
    // ProviderService,
    // 使用 useClass 指定 class，等价以上。useClass 的方式由 IoC 容器负责实例化，我们也可以用 useValue、useFactory 直接指定对象。
    {
      provide: ProviderService, // 指定 token，可以自定义如 'provider_service'
      useClass: ProviderService, // 指定对象的类
    },
    // 使用 useValue 指定值，让 IoC 容器来注入
    {
      provide: 'person',
      useValue: {
        name: 'aaa',
        age: 20,
      },
    },
    // 使用 useFactory 动态产生 provider 的值
    {
      provide: 'person2',
      useFactory() {
        return {
          name: 'bbb',
          age: 19,
        };
      },
    },
    // useFactory，通过 inject 声明了两个 token，一个是字符串 token 的 person，一个是 class token 的 AppService。
    {
      provide: 'person3',
      useFactory(person: { name: string }, provideService: ProviderService) {
        return {
          name: person.name,
          desc: provideService.getHello(),
        };
      },
      inject: ['person', ProviderService],
    },
    // useFactory 支持异步
    {
      provide: 'person4',
      async useFactory() {
        await new Promise((resolve) => {
          setTimeout(resolve, 3000);
        });
        return {
          name: 'person4',
          desc: 'async person',
        };
      },
    },
    // useExisting 指定别名，给 person2 的 token 的 provider 起个新的 token 叫做 person4。
    {
      provide: 'person5',
      useExisting: 'person2',
    },
  ],
})
export class ProviderModule {}
