# pm2

pm2 是 process manager，进程管理，它是第二个大版本，和前一个版本差异很大，所以叫 pm2.

线上的 node 应用不只是跑起来就行了，还要做自动重启、日志、多进程、监控这些事情。而这些事情，都可以用 pm2 来做。pm2 的主要功能就是进程管理、日志管理、负载均衡、性能监控这些。不管是出于稳定性、性能还是可观测性等目的，pm2 都是必不可少的。

```sh
npm install -g pm2

# 添加配置文件
pm2 ecosystem

# 列出所有由 PM2 管理的进程
pm2 list

# 查看某个特定进程的详细信息
pm2 show <app-name|id>
```

## 实际运用

1. pm2 跑本地项目
2. pm2 与 docker 结合起来，在进程崩溃的时候让 pm2 来自动重启，只要写 dockerfile 的时候多安装一个 pm2 的依赖，然后把 node 换成 pm2-runtime 就好了

## 进程管理

```sh
# 根据配置文件自动执行，就可以批量跑一批应用
pm2 start ecosystem.config.js

# 跑一个 node 应用
pm2 start ./dist/main.js
# 超过 200M 内存自动重启
pm2 start ./dist/main.js --max-memory-restart 200M
# 当文件内容改变自动重启
pm2 start ./dist/main.js --watch
# 从 2s 开始每 3s 重启一次
pm2 start ./dist/main.js --cron-restart "2/3 * * * * *"
# 不自动重启
pm2 start ./dist/main.js --no-autorestart

# !!! 设置最大重启次数，避免 pm2 启动后一直闪控制台，屏幕卡顿
pm2 start app.js --max-restarts 5

pm2 stop ./dist/main.js
pm2 restart ./dist/main.js

# 把之前的进程删掉
pm2 delete 0
```

## 日志管理

```sh
# pm2 会把所有进程的日志打印出来，通过前面的“进程id|进程名字”来区分，比如 0|main，而且它会把它写到日志文件里，在 ~/.pm2/logs 下，以“进程名-out.log”和“进程名-error.log”分别保存不同进程的日志，比如 main-out.log 里保存了 main 进程的正常日志，而 main-error.log 里保存了它的报错日志
pm2 logs
pm2 logs 进程名
pm2 logs 进程id

# 查看 main 进程的前 100 行日志
pm2 logs main --lines 100

# 把之前的日志清空
pm2 flush
pm2 flush 进程名|id
```

## 负载均衡

pm2 的负载均衡，是把多个进程分配到多个服务器上，然后把请求分发到这多个服务器上。

node 应用是单进程的，而为了充分利用多核 cpu，我们会使用多进程来提高性能。
node 提供的 cluster 模块就是做这个的，pm2 就是基于这个实现了负载均衡。

```sh
# 我们只要启动进程的时候加上 -i num 就是启动 num 个进程做负载均衡的意思。
pm2 start ./dist/main.js -i max
pm2 start ./dist/main.js -i 0

# 跑起来之后，还可以动态调整进程数，通过 pm2 scale
pm2 scale main 3
# 加了 3 个，可以动态伸缩进程的数量，pm2 会把请求分配到不同进程上去。
pm2 scale main +3

pm2 start ./dist/main.js --instances 4 --exec-mode cluster
```

## 性能监控

```sh
pm2 monit

pm2 monitor
```

## pm2 plus

访问 pm2 的网站，登录，创建 bucket，然后在本地执行 pm2 link xxx xxx，把本地的 pm2 和那个网站关联起来，再执行 pm2 plus 就会打开 bucket 对应的网页，可以在线监控你的应用
