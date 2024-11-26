# Nest 如何创建微服务

微服务和微服务之间一般不是用 http 来通信的，而是直接用 tcp。因为 http 的请求响应会携带大量的 header，这些增大了通信的开销。

🌰：
http 服务向外提供接口：nest-note、microservice-test-main
微服务，提供 tcp 的微服务通信端口：nest-microserice、microservice-test-user
