# 动态模块 Dynamic Module

Provider 是可以通过 useFactory 动态产生，Module也可以的。import 的时候给这个模块传一些参数，动态生成模块的内容。

🌰：src\dynamic-module

动态模块定义的方法是自定义的，本质上都没区别，但 nest 约定了 3 种方法名用来做不同的事情：

- register：用一次模块传一次配置，比如这次调用是 BbbModule.register({aaa:1})，下一次就是 BbbModule.register({aaa:2}) 了

- forRoot：配置一次模块用多次，比如 XxxModule.forRoot({}) 一次，之后就一直用这个 Module，一般在 AppModule 里 import

- forFeature：用了 forRoot 固定了整体模块，用于局部的时候，可能需要再传一些配置，比如用 forRoot 指定了数据库链接信息，再用 forFeature 指定某个模块访问哪个数据库和表。

## ConfigurableModuleBuilder

可以用 ConfigurableModuleBuilder 来生成动态模块。通过 setClassMethodName 设置方法名，通过 setExtras 设置额外的 options 处理逻辑。并且返回的 class 都有 xxxAsync 的版本。

🌰：src\dynamic-module\dynamic-builder
