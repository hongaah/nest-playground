

# 字符串
set a 1
get a
set a1 1
keys 'a*'
keys '*'
incr a // 给 a 加一

# 列表
lpush list1 111 // 向左添加
lpush list1 222
lpush list1 333
rpush list1 444 // 向右添加
rpush list1 555
lpop list1
rpop list1
lrange list1 0 -1

# 集合 set 的特点是无序并且元素不重复。set 只能去重、判断包含，不能对元素排序。 
sadd set1 111
sadd set1 111
sadd set1 111
sadd set1 222
sadd set1 333
sismember set1 111 // 1
sismember set1 444 // 0

# 有序集合 sorted set，也就是 zset，用于排序、去重的需求，比如排行榜
zadd zset1 3 hazel
zadd zset1 1 I
zadd zset1 2 am
zrange zset1 0 2 // 取排名前三的数据

# hash，和 js 中的 map 类似
hset hash1 key1 1
hset hash1 key2 2
hset hash1 key3 3
hset hash1 key4 4
hset hash1 key5 5
hset hash1 key3 333
hget hash1 key3 // 333

# geo 经纬度信息，redis 实际使用 zset 存储的，把经纬度转化为了二维平面的坐标
geoadd loc 13.361389 38.115556 "point1" 15.087269 37.502669 "point2" // 用 loc 作为 key，分别添加 point1 和 point2 的经纬度
geodist loc point1 point2 // 用 geodist 计算两个坐标点的距离
georadius loc 13.361389 38.115556 100 km // 用 georadius 搜索某个半径内的其他点，传入经纬度、半径和单位

# 设置有时效的数据一个过期时间
set point1 1
expire point1 300 // 设置 300 秒后过期
ttl point1 // 查剩余过期时间


