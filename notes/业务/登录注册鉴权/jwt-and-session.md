# 两种登录状态保存方式：JWT、Session

http 是无状态的，也就是请求和请求之间没有关联，但我们很多功能的实现是需要保存状态的。

给 http 添加状态有两种方式：

session + cookie：把用户信息或状态数据保存到服务端，session id 放到 cookie 里返回，这样每次请求会带上 cookie，通过 id 来查找到对应的 session。这种方案有 CSRF、分布式 session、跨域的问题。

jwt：把用户信息或状态数据保存在加密后的 json 格式的 token 里，放到返回的 header 中，需要客户端手动带上，没有 cookie + session 的那些问题，天然支持分布式，但是也有安全性、性能、没法手动控制失效的问题。

上面这两种方案都不是完美的，但那些问题也都有解决方案。

常用的方案基本是 session + redis、jwt + redis 这种。

🌰：
public\jwtandsession.html
src\jwt-and-session
