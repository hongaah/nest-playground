# Docker

Docker 是一种容器技术，它可以在操作系统上创建多个相互隔离的容器。容器内独立安装软件、运行服务。

Docker 的实现原理依赖 linux 的 Namespace、Control Group、UnionFS 这三种机制。Namespace 做资源隔离，Control Group 做容器的资源限制，UnionFS 做文件系统的分层镜像存储、镜像合并。

- namespace：linux 操作系统提供了 namespace 机制，可以给进程、用户、网络等分配一个命名空间，这个命名空间下的资源都是独立命名的。
- Control Group：创建一个 Control Group 可以给它指定参数，比如 cpu 用多少、内存用多少、磁盘用多少，然后加到这个组里的进程就会受到这个限制。
- UnionFS：Docker 设计了一种分层机制：每一层都是不可修改的，也叫做镜像，要修改就创建个新的层，然后通过一种叫做 UnionFS 的机制把这些层合并起来，变成一个文件系统，这样如果有多个容器内做了文件修改，只要创建不同的层即可，底层的基础镜像是一样的。Docker 通过这种分层的镜像存储，极大的减少了文件系统的磁盘占用。
- 可写层（容器层）：因为镜像是不可修改的，容器跑起来会给他多加一个可写层，这样容器就能在这里一层写文件了。当然，再跑一个容器会创建一个新的可写层，另一个容器的可写层的数据就丢了。所以 Docker 设计了挂载机制，可以挂载数据卷到这个可写层上去。这个数据卷是可以持久化的，再跑个新容器，依然可以把这个 volume 挂上去。

dockerfile 描述镜像构建的过程，每一条指令都是一个镜像层。镜像通过 docker run 就可以跑起来，对外提供服务，这时会添加一个可写层（容器层）。挂载一个 volume 数据卷到 Docker 容器，就可以实现数据的持久化。

## Dockerfile

FROM：基于一个基础镜像来修改，可以用 as 给当前镜像指定一个名字，比如 build-stage
WORKDIR：指定当前工作目录
COPY：把容器外的内容复制到容器内，通过 COPY --from=xxx 可以从上个阶段复制文件过来。
EXPOSE：声明当前容器要访问的网络端口，比如这里起服务会用到 8080
RUN：在容器内执行命令
CMD：容器启动的时候执行的命令
VOLUME：设置为挂载点，声明一个持久化卷，用来存储数据

### docker build

通过 docker build 就可以根据这个 dockerfile，在守护进程 docker daemon 来生成镜像。

docker build . -t aaa:ccc // aaa 是镜像名，ccc 是镜像的标签
docker build . -t aaa:ddd -f 2.Dockerfile // 用 -f 指定下 dockefile 的文件名

-t 指定镜像名:镜像的标签
-f 指定 dockefile 的文件名
--build-arg xxx=yyy 指定变量的值

### docker run

docker run 这个镜像就可以生成容器，指定映射的端口、挂载的数据卷、环境变量等

通过 xxx-image 镜像跑起来一个叫做 xxx-container 的容器:
docker run -d -p 8080:8080 -v /data/logs:/logs:ro --name xxx-container xxx-image

-d 运行容器，后台运行，没有指定时会直接在控制台打印日志
-p 指定端口映射，映射宿主机的 8080 到容器的 8080 端口，那容器内 8080 端口的服务，就可以在宿主机的 8080 端口访问了

-v 指定数据卷挂载
  挂载宿主机的 /data/logs 到容器的 /logs 目录，那容器内读写 /logs 目录的时候，改的就是宿主机的 /data/logs 目录，反过来，改宿主机 /data/logs 目录，容器内的 /logs 也会改，这俩同一个。
  后面的 :ro 代表 readonly，也就是容器内这个目录只读，:rw 表示容器内可以读写这个目录。
  如果你挂载某些目录报错，是因为 docker desktop 挂载的目录是需要配置的，在 Settings > Resources > File Sharing 里加一下就行

-e 指定环境变量
--name 没有指定名称，则会自动生成一个随机的容器名

### docker exec

在容器的 terminal 里执行命令，对应的是 docker exec 命令

docker exec -it [容器ID] /bin/bash

-i 是 terminal 交互的方式运行
-t 是 tty 终端类型
然后指定容器 id 和 shell 类型，就可以交互的方式在容器内执行命令了

### docker 命令

退出 container：exit/ ctrl+d
docker logs [容器ID]：查看日志
docker inspect [容器ID]：查看容器的详情
docker volume：管理数据卷
docker start：启动一个已经停止的容器
docker rm：删除一个容器
docker stop：停止一个容器

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

## CMD 结合 ENTRYPOINT

CMD 和 ENTRYPOINT 都是定义容器启动的时候执行的命令，但是 CMD 是在 ENTRYPOINT 之后执行的，所以 ENTRYPOINT 可以用来定义容器启动的时候执行的命令，CMD 可以用来定义容器启动的时候执行的命令的参数。

用 CMD 的时候，启动命令是可以重写成任何命令。

```Dockerfile
# docker run cmd-test echo "test" 会输出 test。
CMD ["http-server", "-p", "8080"]
```

用 ENTRYPOINT 就不会。docker run 传入的参数作为了 echo 的额外参数。

```Dockerfile
# docker run cmd-test echo "22" 会输出 11 22
ENTRYPOINT ["echo", "11"]
```

一般还是 CMD 用的多点，可以灵活修改启动命令。
或者 ENTRYPOINT 和 CMD 结合使用，当没传参数的时候，执行的是 ENTRYPOINT + CMD 组合的命令，而传入参数的时候，只有 CMD 部分会被覆盖。这就起到了默认值的作用。

```Dockerfile
# docker run cmd-test 会输出 111 222
# docker run cmd-test 66666 会输出 111 66666
ENTRYPOINT ["echo", "111"]

CMD ["222"]
```

## COPY vs ADD

COPY 是 Dockerfile 的指令，ADD 是 docker 运行时的指令。

这俩都可以把宿主机的文件复制到容器内。但有一点区别，就是对于 tar.gz 这种压缩文件的处理上，ADD 可以解压 tar.gz 文件。一般情况下，还是用 COPY 居多。

使用 tar 命令打包：tar -zcvf aaa.tar.gz ./aaa

```Dockerfile
# ADD、COPY 都可以用于把目录下的文件复制到容器内的目录下
# ADD 可以把 tar.gz 给解压然后复制到容器内
ADD ./aaa.tar.gz /aaa
# COPY 没有解压，它把文件整个复制过去
COPY ./aaa.tar.gz /bbb
```
