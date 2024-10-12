# 事件通信

npm: @nestjs/event-emitter

多个业务模块之间可能会有互相调用的关系，但是也不方便直接注入别的业务模块的 Service 进来。这种就可以通过 EventEmitter 来实现。在一个 service 里 emit 事件和 data，另一个 service 里 @OnEvent 监听这个事件就可以了。

🌰：src\test-event-emitter
http://127.0.0.1:3000/test-event-emitter-2/user // post 用户注册后发送欢迎邮件
