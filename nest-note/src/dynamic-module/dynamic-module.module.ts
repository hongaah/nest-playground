import { Module, DynamicModule } from '@nestjs/common';
import { DynamicModuleService } from './dynamic-module.service';
import { DynamicModuleController } from './dynamic-module.controller';
import { DynamicBuilderModule } from './dynamic-builder/dynamic-builder.module';

@Module({
  imports: [
    // ConfigurableModuleBuilder 生成动态模块
    // DynamicBuilderModule.register({
    //   aaa: 1,
    //   bbb: 'bb1',
    // }),
    // or alternatively:
    // DynamicBuilderModule.registerAsync({
    //   useFactory: async () => {
    //     await 111;
    //     return {
    //       aaa: 2,
    //       bbb: 'bb2',
    //     };
    //   },
    // }),
    // DynamicBuilderModule.forRoot({
    //   aaa: 1,
    //   bbb: 'bb1',
    // }),
    DynamicBuilderModule.register({
      aaa: 1,
      bbb: 'bb1',
      isGlobal: true,
    }),
  ],
})

// 自定义的动态模块
export class DynamicModuleModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: DynamicModuleModule,
      controllers: [DynamicModuleController],
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        DynamicModuleService,
      ],
      exports: [],
    };
  }
}
