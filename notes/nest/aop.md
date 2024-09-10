# aop 面向切面编程

AOP （Aspect Oriented Programming）:面向切面编程，可以把一些通用逻辑分离到切面中，保持业务逻辑的纯粹性，这样切面逻辑可以复用，还可以动态的增删。一般用在调用 Controller 之前和之后。

Express 的 Middleware 中间件的洋葱模型也是一种 AOP 的实现，因为你可以透明的在外面包一层，加入一些逻辑，内层感知不到。Nest 只是继承了下，那个是在最外层被调用。
而 Nest 实现 AOP 的方式更多，一共有五种切面，包括 Middleware、Guard、Pipe、Interceptor、ExceptionFilter，这些都可以透明的添加某种处理逻辑到某个路由或者全部路由。

AOP 的调用顺序： req - Middleware - Guard - Interceptor - Pipe - *handler* - Interceptor - res，ExceptionFilter 是贯穿全链的

进入路由，调用 Guard，判断是否有权限等，如果没有权限，这里就抛异常 - 会被 ExceptionFilter 处理，返回 403 状态码；如果有权限，就会调用到拦截器 Interceptor，拦截器组织了一个链条，一个个的调用，最后会调用的 controller 的方法，调用 controller 方法之前，会使用 pipe 对参数做处理。

通用逻辑：
业务角度：身份认证、权限控制、参数校验、日志记录、异常处理
框架角度：路由的权限控制、目标 Controller 之前之后的处理、参数的处理

## 中间件 Middleware

中间件是 Express 的一种实现，可以拦截请求，做一些逻辑通用的处理，然后继续往下执行。Nest 的底层是 Express，所以可以使用 Express 的中间件。

- 全局中间件：src/main.ts - app.use()。app.use 等同于在 AppModule 的 configure 方法里的 forRoutes('*')。
- 路由中间件：src/app.module.ts - configure

Nest 与 Express 的 middleware 的区别：
- Express middleware 的 next 参数就是调用下一个 middleware。而 @Next 装饰器是调用下一个 handler。
- 虽然都有 request、response、next 参数，但是 Nest 的可以从 Nest 的 IOC 容器注入依赖，还可以指定作用于哪些路由。

## 守卫 Guard

用于在调用某个 Controller 之前判断权限，返回 true 或者 false 来决定是否放行

- 全局启用 方法1：src/main.ts - app.useGlobalGuards(new LoginGuard());
- 全局启用 方法2：src/app.module.ts - { provide: APP_GUARD, useClass: LoginGuard }
- 路由启用：xx/controller/xx - @UseGuards(LoginGuard)

第一种全局 Guard 的声明方式，是手动 new 的 Guard 实例，不在 IoC 容器里
第二种全局 Guard 是用 provider 的方式声明，Guard 在 IoC 容器里的，可以注入别的 provider

## 拦截器 Interceptor

拦截器是 Nest 的一种实现，可以拦截请求，在目标 Controller 方法前后加入一些逻辑，然后继续往下执行。

- 路由启用：只作用某个 handler，xx/controller/xx - @UseInterceptors(TimeInterceptor)
- controller 级别启用：作用于下面的全部 handler 
- 全局启用 方法1：作用于全部 handler，手动 new 实例，src/main.ts - app.useGlobalInterceptors(new TimeInterceptor())
- 全局启用 方法2：作用于全部 handler，在 IoC 容器里，src/app.module.ts - { provide: APP_INTERCEPTOR, useClass: TimeInterceptor }

和 Middleware 的区别，主要在于参数的不同：
- interceptor 和 guard 可以拿到调用的 controller 和 handler，进而通过 reflector 拿到它的 metadata 等信息的。
- interceptor 里可以用 rxjs 的操作符来组织响应处理流程的
- interceptor 更适合处理与具体业务相关的逻辑，而 middleware 适合更通用的处理逻辑。

## 管道 Pipe

Pipe 是管道的意思，用来对参数做一些检验和转换

- 只对某个参数生效：xx/controller/xx - @Query('num', ValidatePipe)
- 对整个 Controller 都生效：xx/controller - @UsePipes(ValidatePipe)
- 全局生效 方法1：src/main.ts - app.useGlobalPipes(new ValidatePipe())
- 全局生效 方法2，在 IoC 容器里：src/app.module.ts - { provide: APP_PIPE, useClass: ValidatePipe }

### 内置管道

- ValidationPipe
- ParseIntPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- DefaultValuePipe
- ParseEnumPipe
- ParseFloatPipe
- ParseFilePipe

🌰: src\aop\pipe

ValidationPipe 依赖两个包:
- class-transformer 这个包可以把普通对象转换为对应的 class 实例
- class-validator 可以用装饰器和非装饰器两种方式对 class 属性做验证。支持很多种验证规则，比如邮箱、域名、长度、值的范围等，而且错误消息也可以自定义。

ParseUUIDPipe 校验是否是 UUID。UUID 是一种随机生成的几乎不可能重复的字符串，可以用来做 id。它有 v3、v4、v5 3 个版本，我们用 uuid 包可以生成这种 id。

DefaultValuePipe 设置参数默认值，当没传参数的时候，会使用默认值。

### 自定义 Pipe

手写一个 pipe 就是实现 PipeTransform 接口的 transform 方法，它的返回值就是传给 handler 的值。在 pipe 里可以拿到装饰器和 handler 参数的各种信息，基于这些来实现校验和转换。

🌰: src\aop\concept\validate.pipe.ts

## 异常处理 ExceptionFilter

代码里只要抛出不同的异常，用 @Catch 装饰器来声明拦截这些异常，自定义异常返回的内容。

- 路由启用：只作用某个 handler，xx/controller/xx - @UseFilters(TestFilter)
- 对整个 Controller 都生效：xx/controller - @UseFilters(TestFilter)

Nest 内置了很多 http 相关的异常，都是 HttpException 的子类

- BadRequestException
- UnauthorizedException
- NotFoundException
- ForbiddenException
- NotAcceptableException
- RequestTimeoutException
- ConflictException
- GoneException
- PayloadTooLargeException
- UnsupportedMediaTypeException
- UnprocessableException
- InternalServerErrorException
- NotImplementedException
- BadGatewayException
- ServiceUnavailableException
- GatewayTimeoutException
