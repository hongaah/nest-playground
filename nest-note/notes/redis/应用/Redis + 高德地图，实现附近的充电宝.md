# Redis + 高德地图，实现附近的充电宝

附近的人、附近的酒店、附近的充电宝的功能可以用 Redis 实现。redis 是 key-value 的数据库，value 有很多种类型，其中，geo 的数据结构，可以方便的计算两点的距离，计算某个半径内的点，就可以用来实现附近的人等功能。geo 的底层数据结构是 zset，所以可以使用 zset 的命令。

[redis geo docs](https://redis.io/docs/latest/develop/data-types/geospatial/)

```sh
# geoadd 添加两个位置
geoadd loc 13.361389 38.115556 "guangguang" 15.087269 37.502669 "dongdong"
# geodist 计算两个位置之间的距离
geodist loc guangguang dongdong
# georadius 分别查找经度 15、纬度 37 位置的附近 100km 半径和 200km 半径的点
georadius loc 15 37 100 km
georadius loc 15 37 200 km
```

实现思路：
服务端提供一个接口，让充电宝机器上传位置信息，然后把它存到 redis 里。再提供个搜索的接口，基于传入的位置用 georadius 来搜索附近的充电宝机器，返回客户端。
在 Nest 里封装了 geoadd、geopos、zrange、georadius 等 redis 命令。实现了添加点，搜索附近的点的功能。
🌰：nest-note\src\nearby-search

客户端可以在地图上把这些点画出来。用高德地图或者百度地图都可以，他们都支持在地图上绘制 marker 标记的功能。
🌰：nest-note\public\nearby-search.html
申请 key：https://lbs.amap.com/api/javascript-api-v2/getting-started

```sh
# 添加两个位置
# visit: localhost:3000/nearby-search/addPos?name=lisa&longitude=15&latitude=35
# visit: localhost:3000/nearby-search/addPos?name=rose&longitude=15&latitude=85

# 在 redis insight 里测试
geopos positions lisa
zrange positions 0 -1

# 验证：
# http://localhost:3000/nearby-search/allPos
# http://localhost:3000/nearby-search/pos?name=lisa

# 计算两点的距离，大概是 5561 km
geodist positions lisa rose km

# 在 lisa 附近搜索半径 5000km 内的点位置
# localhost:3000/nearby-search/nearbySearch?longitude=15&latitude=35&radius=5000
# localhost:3000/nearby-search/nearbySearch?longitude=15&latitude=35&radius=6000
```
