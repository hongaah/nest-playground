# 基于 Redis 实现分布式 session

🌰：src\redis-session

当我们用 session 实现用户登录时，是在服务端内存存储会话数据，通过 cookie 中的 session id 关联。但它不支持分布式，意思是如果只在一台服务器存储数据，另一台服务器访问，数据就拿不到了。可以通过以下几种方式解决：

1. 使用 jwt，jwt 是在客户端存储会话数据，所以天然支持分布式。
2. 使用 redis，把数据存储在 redis 里，通过 sid 找到数据，实现分布式的 session。
3. 不同服务器复制数据。

基于 Redis 实现分布式 session 的步骤：
用户第一次请求的时候，生成一个随机 id，以它作为 key，存储的对象作为 value 放到 redis 里。之后携带 cookie 的时候，根据其中的 sid 来取 redis 中的值，注入 handler。修改 session 之后再设置到 redis 里。

redis 数据结构使用 hash，封装 RedisModule 来操作 Redis，封装 SessionModule 来读写 redis 中的 session，以 sid_xxx 为 key。之后在 ctronller 里就可以读取和设置 session 了，用起来和内置的传统 session 差不多（🌰：src\jwt-and-session）。但是它是支持分布式的。
