# ExecutionContext：切换不同上下文

Nest 支持创建多种类型的服务：包括 HTTP 服务、WebSocket 服务，还有基于 TCP 通信的微服务。这三种服务都支持 Guard、Interceptor、Exception Filter 功能。
不同类型的服务它能拿到的参数是不同的，比如 http 服务可以拿到 request、response 对象，而 websocket 服务就没有。为了让同一个 Guard、Interceptor、Exception Filter 在不同类型的服务里复用。Nest 设计了 ArgumentHost 和 ExecutionContext 类。

## filter

🌰：/src/execution-context/aaa.filter.ts

ArgumentHost 是用于切换 http、websocket、rpc 等上下文类型的，可以根据上下文类型取到对应的 argument，让 Exception Filter 等在不同的上下文中复用。

## guard

🌰：/src/execution-context/bbb.guard.ts

ExecutionContext ArgumentHost 的子类，扩展了 getClass、getHandler 方法。可以结合 reflector 来取出其中的 metadata。

## interceptor

🌰：/src/execution-context/ccc.interceptor.ts

interceptor 里也有 ExecutionContext
