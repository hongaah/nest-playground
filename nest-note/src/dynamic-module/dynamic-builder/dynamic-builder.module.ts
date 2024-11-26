import { Module } from '@nestjs/common';
import { DynamicBuilderController } from './dynamic-builder.controller';
import { ConfigurableModuleClass } from './ccc.module-definition';

@Module({
  controllers: [DynamicBuilderController],
})
export class DynamicBuilderModule extends ConfigurableModuleClass {}
