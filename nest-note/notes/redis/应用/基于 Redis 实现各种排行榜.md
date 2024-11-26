# 基于 Redis 实现各种排行榜

生活中我们经常会见到各种排行榜，以及它们的周榜、月榜、年榜等。

这些排行榜的功能都是用 redis 的 zset 有序集合实现的。它保存的值都有一个分数，会自动排序。多个集合之间可以求并集、交集、差集。通过并集的方式就能实现月榜合并成年榜的功能。

zset 有这些命令：

ZADD：往集合中添加成员
ZREM：从集合中删除成员
ZCARD：集合中的成员个数
ZSCORE：某个成员的分数
ZINCRBY：增加某个成员的分数
ZRANK：成员在集合中的排名
ZRANGE：打印某个范围内的成员
ZRANGESTORE：某个范围内的成员，放入新集合
ZCOUNT：集合中分数在某个返回的成员个数
ZDIFF：打印两个集合的差集
ZDIFFSTORE：两个集合的差集，放入新集合
ZINTER：打印两个集合的交集
ZINTERSTORE：两个集合的交集，放入新集合
ZINTERCARD：两个集合的交集的成员个数
ZUNION：打印两个集合的并集
ZUNIONSTORE：两个集合的并集，放回新集合

🌰: src\redis-ranking
