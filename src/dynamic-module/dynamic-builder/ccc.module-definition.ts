import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface CccModuleOptions {
  aaa: number;
  bbb: string;
}

// ConfigurableModuleBuilder 生成动态模块，对定义 register、registerAsync 的过程做了封装。
// 用 ConfigurableModuleBuilder 默认会生成一个 class，这个 class 里就带了 register、registerAsync 方法。返回的 ConfigurableModuleClass、MODULE_OPTIONS_TOKEN 分别是生成的 class 、options 对象的 token，OPTIONS_TYPE 是模块的 option 类型，ASYNC_OPTIONS_TYPE 是 async 方式创建模块的 option 类型。
export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
  // } = new ConfigurableModuleBuilder<CccModuleOptions>().build();

  // 自定义注册方法名 forRoot forRootAsync
  // } = new ConfigurableModuleBuilder<CccModuleOptions>()
  //   .setClassMethodName('forRoot')
  //   .build();

  // 根据传入的参数决定是否设置为全局模块。通过 setExtras 方法第一个参数是给 options 扩展 isGlobal 属性，第二个参数是收到这些扩展属性之后如何修改模块定义。
} = new ConfigurableModuleBuilder<CccModuleOptions>()
  .setClassMethodName('register')
  .setExtras(
    {
      isGlobal: true,
    },
    (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }),
  )
  .build();
