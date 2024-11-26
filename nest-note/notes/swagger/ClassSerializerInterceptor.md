# 手写 ClassSerializerInterceptor

用 entity 结合 class-transfomer 的装饰器和 ClassSerializerInterceptor 拦截器可以实现复用 entity 做 vo 的功能，自己实现一遍加深理解。

🌰 @SerializeOptions 装饰器: src\test-dto-vo\config\my-serialize-options.decorator.ts，这个功能就是在 class 或者 handler 上加一个 metadata，存放 class-transformer 的 options。
🌰 ClassSerializerInterceptor 拦截器: src\test-dto-vo\config\my-class-serializer.interceptor.ts，这个功能就是用 reflector 把它取出来，然后拦截响应，用 map oprator对响应做变换，调用 classTransformer 包的 instanceToPlain 方法进行转换。
