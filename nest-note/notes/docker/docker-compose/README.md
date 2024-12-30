# docker-compose

对于 nest 项目，一般要起很多服务，docker 的方式需要手动 docker build 来构建 nest 应用的镜像。然后按顺序使用 docker run 来跑 mysql、redis、nest 容器。

而 docker compose 就只需要写一个 docker-compose.yml 文件，配置多个 service 的启动方式和 depends_on 依赖顺序。然后 docker-compose up 就可以批量按顺序启动一批容器。

基本上，如果项目依赖别的服务，在单台机器跑的时候都是需要用 Docker Compose 的。

## docker 一个个跑 nest、mysql、redis

要注意 nest 容器里需要使用宿主机 ip 来访问 mysql、redis 服务

```sh
# 部署 nest 项目，镜像名为 nest-note TODO
docker build -t nest-note .
# 跑 mysql
docker run -d -p 3306:3306 -v /Users/hazel/docker-demo/mysql8:/var/lib/mysql --name mysql-container mysql:8.0
# 跑 redis
docker run -d -p 6379:6379 -v /Users/hazel/docker-demo/redis:/data --name redis-container redis
# 最后跑 nest 项目
docker run -d -p 3000:3000 --name nest-container nest-note

# 查看三个容器的日志
docker logs nest-container
docker logs mysql-container
docker logs redis-container
```

## Docker Compose 的方式运行管理多个容器

```sh
# 停掉之前的 docker 容器
docker stop nest-container mysql-container redis-container

# 使用 docker-compose 运行 nest 项目，docker-compose 会把所有容器的日志合并输出
docker-compose up
```

```yml :docker-compose.yml
services:
  # 每个 services 都是一个 docker 容器，这里指定了 nest-app、mysql-container、reids-container 3 个service
  nest-app:
    build:
      context: ./
      dockerfile: ./Dockerfile
    # 设置 nest-app 依赖其他两个 service。这样 docker-compose 就会先启动另外两个，再启动这个，这样就能解决顺序问题。
    depends_on:
      - mysql-container
      - redis-container
    ports:
      - '3000:3000'
  mysql-container:
    image: mysql:8.0
    ports:
      - '3306:3306'
    volumes:
      - /Users/hazel/docker-demo/mysql8:/var/lib/mysql
  redis-container:
    image: redis
    ports:
      - '6379:6379'
    volumes:
      - /Users/hazel/docker-demo/redis:/data
```
