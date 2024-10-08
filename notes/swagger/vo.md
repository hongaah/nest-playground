# vo 封装返回的响应数据

定义 vo 的几种方式：
- 定义 vo 文件，业务性很强的聚合型接口新增 vo
- 继承 entity，crud 的接口 vo 和 entity 很相似可以使用

🌰: src\test-dto-vo\my-vo\my-vo.controller.ts

- 对整个 Controller 都生效：ClassSerializerInterceptor 和 SerializeOptions 可以直接应用到 class 上，这样controller 所有的接口返回的对象都会做处理
- 路由启用：只在某个 handler 生效

ClassSerializerInterceptor 的底层是基于 class-transfomer 包来实现的，拿到响应对象，plainToClass 拿到 class，然后根据 class 的装饰器再 classToPlain 创建序列化的对象。

## entity 定义

- 返回内容自定义：entity 里加上 @Exclude 可以排除某些字段、@Expose 可以增加一些派生字段、@Transform 可以对已有字段的序列化结果做修改。
- 用于 swagger 文档：swagger 的 @ApiResponse 也完全可以用 entity 来代替 vo，在想排除的字段加一下 @ApiHideProperty，显示的属性就加上 @ApiProperty。
