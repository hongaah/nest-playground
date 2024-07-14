docker pull nginx:latest

# 根据 Dockerfile 构建一个镜像
docker build . -t aaa:bbb -f arg.Dockerfile

# 默认是 Dockerfile
docker build . -t aaa:bbb

# docker run 会返回一个容器的 hash
docker run --name nginx-test2 -p 80:80 -v /tmp/aaa:/usr/share/nginx/html -e KEY1=VALUE1 -d nginx:latest

# 容器列表
docker ps
docker ps -a

# 镜像列表
docker images

# 在容器的 terminal 里执行命令，对应的是 docker exec 命令
docker exec -it 59f491fd9b09d6658a6143a828886ab37765003292d8cabeb1dcfca16f07d6eb /bin/bash

# 查看日志
docker logs 59f491fd9b09d6658a6143a828886ab37765003292d8cabeb1dcfca16f07d6eb
# 查看容器的详情
docker inspect 59f491fd9b09d6658a6143a828886ab37765003292d8cabeb1dcfca16f07d6eb
# 管理数据卷
docker volume
# 启动一个已经停止的容器
docker start
# 删除一个容器
docker rm
# 停止一个容器
docker stop
