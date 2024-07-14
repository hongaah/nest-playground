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

# 指定挂载点
# 在 dockerfile 里指定 VOLUME 之后，如果你 docker run 的时候没有带 -v，那会放在一个临时的目录里。这样就算你删了容器，数据也可以在这个目录找回。docker inspect 可以看到路径是一个临时的目录。
VOLUME /app

CMD ["http-server", "-p", "8080"]
