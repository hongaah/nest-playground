# 桥接网络

多个容器之间的通信方式一般使用桥接网络是最简便的。

nest 容器是要指定和宿主机的端口映射的，因为宿主机要访问这个端口的网页。之前是通过宿主机 ip 来互相访问的，通过桥接网络就可以通过容器名直接互相访问了。

实现原理就是对 Network Namespace 的处理，本来是 3个独立的 Namespace，当指定了 network 桥接网络，就可以在 Namespace 下访问别的 Namespace 了。

```sh
# 创建一个桥接网络
docker network create common-network

# 跑 mysql 通过 --network 指定桥接网络为我们刚创建的 common-network
docker run -d --network common-network -p 3306:3306 -v /Users/hazel/docker-demo/mysql8:/var/lib/mysql --name mysql-container mysql:8.0
# 跑 redis 通过 --network 指定桥接网络为我们刚创建的 common-network
docker run -d --network common-network -p 6379:6379 -v /Users/hazel/docker-demo/redis:/data --name redis-container redis

# 修改 nest 项目连接 mysql 和 redis 的地址为对应的 docker 容器名，见下面的【代码2】
# 构建 nest 镜像
docker build -t nest-note .
# 跑 nest 项目
docker run -d --network common-network -p 3000:3000 --name nest-container nest-note

docker logs nest-container

# 桥接网络版本的 docker-compose.yml：./docker-compose.yml
# 删除 3 个容器和它们的镜像
docker-compose down --rmi all
# 执行
docker-compose up
```

nest 配置

```ts: 代码2
export const AppDataSource = {
  type: 'mysql',
  // 改成用容器名来访问
  // host: 'localhost',
  host: 'mysql-container',
  port: 3306,
  username: 'root',
  password: 'hazel',
  database: 'login_test',
  synchronize: true,
  logging: true,
  entities: [User],
  poolSize: 10,
  connectorPackage: 'mysql2',
  extra: {
    authPlugin: 'sha256_password',
  },
} as any;

await redisStore({
  socket: {
    // 改成用容器名来访问
    // host: 'localhost',
    host: 'redis-container',
    port: 6379,
  },
  database: 2,
  ttl: 60 * 60 * 24 * 7
}),
```