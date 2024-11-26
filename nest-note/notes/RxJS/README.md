# RxJS 处理异步逻辑的库

[rxjs docs](https://rxjs.dev/guide/operators#creation-operators-1) 
[rxjs zhcn](https://rxjs.tech/) 
[rxjs 在线测试](https://rxviz.com/)
[rxjs 动画演示](https://reactive.how/)

如果异步逻辑复杂度高，使用 RxJS 的收益是很高的，异步逻辑的编写就变成了 operator 的组合，少写很多代码。也是因为这个原因，Nest 的 interceptor 集成了 RxJS，可以用它来处理响应。

Nest interceptor 常用的 operator：

- tap: 不修改响应数据，执行一些额外逻辑，比如记录日志、更新缓存等
- map：对响应数据做修改，一般都是改成 {code, data, message} 的格式
- catchError：在 exception filter 之前处理抛出的异常，可以记录或者抛出别的异常
- timeout：处理响应超时的情况，抛出一个 TimeoutError，配合 catchErrror 可以返回超时的响应
