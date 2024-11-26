import {
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';

@Injectable()
export class LifecycleService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('LifecycleService OnModuleInit');
  }

  onApplicationBootstrap() {
    console.log('LifecycleService OnApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('LifecycleService onModuleDestroy');
  }

  beforeApplicationShutdown(signal: string) {
    console.log('LifecycleService beforeApplicationShutdown', signal);
  }

  onApplicationShutdown() {
    console.log('LifecycleService onApplicationShutdown');
  }

  getHello(): string {
    return 'Hello Lifecycle!';
  }
}
