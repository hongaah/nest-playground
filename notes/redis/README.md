# redis

因为 mysql 存在硬盘，并且会执行 sql 的解析，会成为系统的性能瓶颈，所以我们要做一些优化。
常见的就是在内存中缓存数据，使用 redis 这种内存数据库。
它是 key、value 的格式存储的，value 有很多种类型，比如字符串（string）、列表（list）、集合（set）、有序集合（sorted set）、哈希表（hash）、地理信息（geospatial）、位图（bitmap）等

redis 是分为服务端和客户端的，它提供了一个 redis-cli 的命令行客户端。

[docs](https://redis.io/docs/latest/develop/data-types/strings/)
[download](http://redis.io/download)
[RedisInsight - redis gui](https://redis.io/insight/#insight-form)

命令行：
msi - redis-cli.exe
D:\Program Files\Redis>./redis-cli -h 127.0.0.1 -p 6379
GUI：可视化操作 RedisInsight

用途：
1. 缓存：将查询结果缓存到 redis，下次查询直接从 redis 读取，减少数据库的查询压力。
2. 直接作为存储数据的地方，因为 redis 本身是会做持久化的，也可以把数据直接保存在 redis 里，不存到 mysql。不过这样成本比较高，经常需要扩容。

## 在 node 中操作 redis

通过 redis 的 npm 包（redis、ioredis 等）可以连接 redis server 并执行命令。
如果在 nest 里，可以通过 useFactory 动态创建一个 provider，在里面使用 redis 的 npm 包创建连接。

[官方 redis](notes\redis\node-redis\index.js)
[ioredis](notes\redis\node-redis\index.js)
[nest - redis](src\redis)
