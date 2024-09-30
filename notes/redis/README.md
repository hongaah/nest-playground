# redis

因为 mysql 存在硬盘，并且会执行 sql 的解析，会成为系统的性能瓶颈，所以我们要做一些优化。常见的就是在内存中缓存数据，使用 redis 这种内存数据库。

redis 是 key、value 的格式存储的，value 有很多种类型：
字符串（string）：可以存数字、字符串，比如存验证码就是这种类型
列表（list）：存列表数据
集合（set）：存去重后的集合数据，支持交集、并集等计算，常用来实现关注关系，比如可以用交集取出互相关注的用户
有序集合（sorted set）：排序的集合，可以指定一个分数，按照分数排序。我们每天看的文章热榜、微博热榜等各种排行榜
哈希表（hash）：存一个 map 的结构，比如文章的点赞数、收藏数、阅读量，就可以用 hash 存
地理信息（geospatial）：存地理位置，支持地理位置之间的距离计算、按照半径搜索附近的位置，比如附近的充电宝
位图（bitmap）

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
3. 分布式数据，服务器多时会用到
4. 临时数据，比如验证码，token
5. 地理位置、距离计算

## 在 node 中操作 redis

通过 redis 的 npm 包（redis、ioredis 等）可以连接 redis server 并执行命令。
如果在 nest 里，可以通过 useFactory 动态创建一个 provider，在里面使用 redis 的 npm 包创建连接。

[官方 redis](notes\redis\node-redis\index.js)
[ioredis](notes\redis\node-redis\index.js)
[nest - redis](src\redis)
