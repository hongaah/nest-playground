# 全局模块和生命周期

模块导出 provider，另一个模块需要 imports 它才能用这些 provider。比如 HttpService 被很多地方引用，每个模块都 imports 就很麻烦，可以通过 @Global 声明模块为全局的。不过全局模块还是尽量少用，不然注入的很多 provider 都不知道来源，会降低代码的可维护性。

Nest 在启动的时候，会递归解析 Module 依赖，扫描其中的 provider、controller，注入它的依赖。全部解析完后，会监听网络端口，开始处理请求。这个过程中，Nest 暴露了一些生命周期方法。

## 生命周期

Nest 实现了 IoC 容器，会从入口模块开始扫描，分析 Module 之间的引用关系，对象之间的依赖关系，自动把 provider 注入到目标对象。

生命周期初始化：

1. 首先，递归初始化模块，会依次调用模块内的 controller、provider 的 onModuleInit 方法，然后再调用 module 的 onModuleInit 方法。
2. 全部初始化完之后，再依次调用模块内的 controller、provider 的 onApplicationBootstrap 方法，然后调用 module 的 onApplicationBootstrap 方法
3. 然后监听网络端口。
4. 之后 Nest 应用就正常运行了。

生命周期销毁：

1. 先调用每个模块的 controller、provider 的 onModuleDestroy 方法，然后调用 Module 的 onModuleDestroy 方法。
2. 之后再调用每个模块的 controller、provider 的 beforeApplicationShutdown 方法，然后调用 Module 的 beforeApplicationShutdown 方法。
3. 然后停止监听网络端口。
4. 之后调用每个模块的 controller、provider 的 onApplicationShutdown 方法，然后调用 Module 的 onApplicationShutdown 方法。
5. 之后停止进程。

provider、controller、module 都支持启动和销毁的生命周期函数，这些生命周期函数都支持 async 的方式。
可以在其中做一些初始化、销毁的逻辑，比如 onApplicationShutwon 里通过 moduleRef.get 取出一些 provider，执行关闭连接等销毁逻辑。
