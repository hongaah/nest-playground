import { Controller, Get, Inject } from '@nestjs/common';
import { DynamicModuleService } from './dynamic-module.service';

@Controller('dynamic-module')
export class DynamicModuleController {
  constructor(private readonly dynamicModuleService: DynamicModuleService) {}

  // 注册的配置信息
  @Inject('CONFIG_OPTIONS') private configOptions: Record<string, any>;

  @Get()
  getHello(): string {
    console.log(this.configOptions);
    return this.dynamicModuleService.getHello();
  }
}
