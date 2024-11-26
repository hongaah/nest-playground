import {
  Get,
  Controller,
  OnModuleInit,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { LifecycleService } from './lifecycle.service';

/**
 * 生命周期方法:
 * onModuleInit、onApplicationBootstrap
 */
@Controller('lifecycle')
export class LifecycleController
  implements OnModuleInit, OnApplicationBootstrap
{
  constructor(private readonly lifecycleService: LifecycleService) {}

  onModuleInit() {
    console.log('LifecycleController OnModuleInit');
  }

  onApplicationBootstrap() {
    console.log('LifecycleController OnApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('LifecycleController onModuleDestroy');
  }

  beforeApplicationShutdown(signal: string) {
    console.log('LifecycleController beforeApplicationShutdown', signal);
  }

  onApplicationShutdown() {
    console.log('LifecycleController onApplicationShutdown');
  }

  @Get()
  getHello(): string {
    return this.lifecycleService.getHello();
  }
}
