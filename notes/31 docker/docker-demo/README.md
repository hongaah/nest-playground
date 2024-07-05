
# Docker

Docker 是一种容器技术，它可以在操作系统上创建多个相互隔离的容器。容器内独立安装软件、运行服务。

## Dockerfile

FROM：基于一个基础镜像来修改，可以用 as 给当前镜像指定一个名字，比如 build-stage
WORKDIR：指定当前工作目录
COPY：把容器外的内容复制到容器内，通过 COPY --from=xxx 可以从上个阶段复制文件过来。
EXPOSE：声明当前容器要访问的网络端口，比如这里起服务会用到 8080
RUN：在容器内执行命令
CMD：容器启动的时候执行的命令
VOLUME：设置为挂载点，声明一个持久化卷，用来存储数据

### docker run

docker run 这个镜像就可以生成容器，指定映射的端口、挂载的数据卷、环境变量等

### docker build

通过 docker build 就可以根据这个 dockerfile，在守护进程 docker daemon 来生成镜像。

docker build . -t aaa:ccc // aaa 是镜像名，ccc 是镜像的标签
docker build . -t aaa:ddd -f 2.Dockerfile // 用 -f 指定下 dockefile 的文件名

## 端口映射、数据卷（volume）挂载

docker run -d -p 8080:8080 -v /data/logs:/logs --name xxx-container xxx-image

通过 xxx-image 镜像跑起来一个叫做 xxx-container 的容器

-d 运行容器，后台运行
-p 指定端口映射，映射宿主机的 8080 到容器的 8080 端口，那容器内 8080 端口的服务，就可以在宿主机的 8080 端口访问了
-v 指定数据卷挂载，挂载宿主机的 /data/logs 到容器的 /logs 目录，那容器内读写 /logs 目录的时候，改的就是宿主机的 /data/logs 目录，反过来，改宿主机 /data/logs 目录，容器内的 /logs 也会改，这俩同一个。

## 流程

一般在项目里维护 Dockerfile ，然后执行 docker build 构建出镜像、push 到镜像仓库，部署的时候 pull 下来用 docker run 跑起来。

基本 CI/CD 也是这样的流程：

CI 的时候 git clone 项目，根据 dockerfile 构建出镜像，打上 tag，push 到仓库。
CD 的时候把打 tag 的镜像下下来，docker run 跑起来。

## 减小镜像体积

### .dockerignore

docker build 会把 dockerfile 和它的构建上下文（也就是所在目录）打包发送给 docker daemon 来构建镜像。
所以 docker 支持通过 .dockerignore 声明哪些不需要发送给 docker daemon。忽略这些用不到的文件，可以让构建更快、镜像体积更小。

### 多阶段构建

多阶段构建可以减少镜像体积，因为可以只保留需要的内容。也就是 build 一个镜像、production 一个镜像，最终保留下 production 的镜像。

runc 运行时，是一个用于运行容器的工具，是 Docker 的一个子项目。

### 使用本身体积量小的基础镜像

docker 容器内跑的是 linux 系统，各种镜像的 dockerfile 都会继承 linux 镜像作为基础镜像。
可以换成 alpine 的，这是一个 linux 发行版，主打的就是一个体积小，它去掉了很多 linux 里用不到的功能，使得镜像体积更小。

```
FROM node:18.0-alpine3.14 as build-stage
```

## 镜像缓存

docker 是分层存储的，dockerfile 里的每一行指令是一层，会做缓存。
每次 docker build 的时候，只会从变化的层开始重新构建，没变的层会直接复用。

在 dockerfile 里的指令都会被缓存，所以如果修改了 dockerfile，需要清理缓存。

如果前端构建场景下，先执行复制 package.json，执行 npm install，然后复用这层的缓存，会比将安装完的依赖和代码再一起复制过去容器，减少很多构建时间。因为不管 package.json 变没变，任何一个文件变了，都会重新 npm install，这样没法充分利用缓存，性能不好。

现在重新跑 docker build，不管跑多少次，速度都很快，因为文件没变，直接用了镜像缓存。

## 使用 ARG 增加构建灵活性

ARG 命令可以定义一个变量，然后通过 docker build --build-arg xxx=yyy 来指定变量的值。

