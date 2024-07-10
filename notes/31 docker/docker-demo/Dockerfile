# 声明了一个 http-server 提供静态服务的镜像
# 继承 node:latest 基础镜像
FROM node:latest

# 指定当前目录
WORKDIR /app

# 复制宿主机文件到容器的当前目录
COPY . .

# 执行命令
RUN npm config set registry https://registry.npmmirror.com/

RUN npm install -g http-server

# 指定容器需要暴露的端口是 8080
EXPOSE 8080

VOLUME /app

# 容器启动时执行的命令
# 用 ENTRYPOINT + CMD 的方式更加灵活，当没传参数的时候，执行的是 ENTRYPOINT + CMD 组合的命令，而传入参数的时候，只有 CMD 部分会被覆盖。
# docker run cmd-test 会输出 111 222
# docker run cmd-test 66666 会输出 111 66666
ENTRYPOINT ["echo", "111"]

CMD ["222"]
