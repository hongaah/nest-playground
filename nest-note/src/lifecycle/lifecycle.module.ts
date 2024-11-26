import {
  Global,
  Module,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
// import { ModuleRef } from '@nestjs/core';
import { LifecycleService } from './lifecycle.service';
import { LifecycleController } from './lifecycle.controller';

/**
 * @Global 声明全局模块
 *
 * 模块导出 provider，另一个模块需要 imports 它才能用这些 provider。
 * 比如 HttpService 被很多地方引用，每个模块都 imports 就很麻烦，可以声明为全局的，不过全局模块还是尽量少用，不然注入的很多 provider 都不知道来源，会降低代码的可维护性。
 *
 */
@Global()
@Module({
  controllers: [LifecycleController],
  providers: [LifecycleService],
  exports: [LifecycleService],
})
export class LifecycleModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('LifecycleModule OnModuleInit');
  }

  onApplicationBootstrap() {
    console.log('LifecycleModule OnApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('LifecycleModule onModuleDestroy');
  }

  beforeApplicationShutdown(signal: string) {
    console.log('LifecycleModule beforeApplicationShutdown', signal);
  }

  onApplicationShutdown() {
    // const lifecycleService =
    //   this.moduleRef.get<LifecycleService>(LifecycleService);
    // console.log('--------------------------', lifecycleService.getHello());

    console.log('LifecycleModule onApplicationShutdown');
  }
}
