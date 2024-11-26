# nest

controller：控制器，用于处理路由，解析请求参数

handler：控制器里处理路由的方法

service：实现业务逻辑的地方，比如操作数据库等

dto：data transfer object，数据传输对象，用于封装请求体里数据的对象

module：模块，包含 controller、service 等，比如用户模块、书籍模块

entity：对应数据库表的实体

ioc：Inverse of Controller，反转控制或者叫依赖注入，只要声明依赖，运行时 Nest 会自动注入依赖的实例

aop：Aspect Oriented Programming 面向切面编程，在多个请求响应流程中可以复用的逻辑，比如日志记录等，具体包含 middleware、interceotor、guard、exception filter、pipe

nest cli：创建项目、创建模块、创建 controller、创建 service 等都可以用这个 cli 工具来做

## 核心特点

在 main.ts 里调用 NestFactory.create 方法，就会从 AppModule 开始递归解析 Module，实例化其中的 provider、controller，并依次调用它们的 onModuleInit 生命周期方法。之后会再递归调用每个 Module 的 provider、controller 的还有 Module 自身的 onApplicationBootstrap 生命周期方法。

通过 IOC 实现了对象的自动创建、依赖的自动组装。
通过 AOP 实现了通用逻辑的抽取和复用。
IOC 内部的 Module 和 Provider 也都支持动态创建，灵活度很高。

## 对象

Controller 对象：接收 http 请求，调用 Service，返回响应
Service 对象：实现业务逻辑
Repository 对象：实现对数据库的增删改查
Config：配置对象
DataSource：数据库链接对象

Controller 依赖了 Service 实现业务逻辑，Service 依赖了 Repository 来做增删改查，Repository 依赖 DataSource 来建立连接，DataSource 又需要从 Config 对象拿到用户名密码等信息。
