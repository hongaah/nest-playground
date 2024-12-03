# etcd

## win10 安装 etcd

1. 下载安装包 https://github.com/coreos/etcd/releases
2. 解压安装包后点击 etcd.exe 运行 etcd 服务，客户端用 etcdctl 来执行命令

这样的步骤直接执行命令是不用权限的

## 对比 redis

redis 也是 key-value 存储的，不用 redis 做配置中心和注册中心有个原因是因为 redis 没法监听不存在的 key 的变化，而 etcd 可以，而配置信息很多都是动态添加的。还有很多别的原因，比如 redis 只是为了缓存设计的，不是专门的配置中心、注册中心的中间件。专业的事情还是交给专业的中间件来干。

## 案例

### 简单例子

查询、监听查询

🌰 ：nest-note\notes\微服务\etcd\src\index.js

```sh
node ./src/index.js

# cmd 下执行，可以看到实例终端打印出监听信息
./etcdctl put /services/a xxxx
./etcdctl del /services/a
```

### 封装配置中心和注册中心的工具函数

服务注册、服务发现

🌰：nest-note\notes\微服务\etcd\src\index.js

```sh
node ./src/index.js

# cmd 下执行，可以看到实例终端打印出监听信息
./etcdctl del /services/my_service/instance_2
```