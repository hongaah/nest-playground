# Nest 实现 WebSocket 服务

nest 需要用到 @nestjs/websockets 和 @nestjs/platform-socket.io 包。客户端也是使用 socket.io 来连接。如果想异步返回消息，就通过 rxjs 的 Observer 来异步多次返回。

```sh
nest g resource wsxxx --no-spec
# transport layer 选 WebSocket
```

🌰：
src\http\ws
public\ws.html

涉及到这些装饰器：

@WebSocketGateWay：声明这是一个处理 weboscket 的类。
@SubscribeMessage：声明处理的消息。
@MessageBody：取出传过来的消息内容。
@WebSocketServer：取出 Socket 实例对象
@ConnectedSocket：取出 Socket 实例对象注入方法

## websocket 服务端的生命周期

在生命周期函数里可以拿到实例对象

- afterInit：初始化完成，但还没有连接上客户端。
- handleConnection：客户端连接上。
- handleDisconnect：客户端断开连接。
