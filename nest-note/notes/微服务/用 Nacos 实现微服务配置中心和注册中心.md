# 用 Nacos 实现微服务配置中心和注册中心

nacos 相比 etcd，多了内置的控制台页面，比较方便。

作为注册中心就是注册服务的实例，比如 aaaService 有多个服务实例的时候，可以分别用 registerService、deregisterInstance、getAllInstances、subscribe 实现新增、删除、查询、监听。

作为配置中心就是管理配置，可以分别用 publishSingle、remove、getConfig、subscribe 实现新增（修改）、删除、查询、监听。

🙌：docker 启动 nacos 服务

```sh
docker pull nacos/nacos-server

# 指定环境变量 MODE 为 standalone，也就是单机启动
# 启动后可以看到打印的一个网页地址，访问 localhost:8848/nacos/index.html 就可以看到控制台页面了
docker run --name nacos-test -p 8848:8848 -e MODE=standalone -d nacos/nacos-server
```

🌰: nest-note\notes\微服务\nacos-node-test

```sh
# Nacos 注册中心 NacosNamingClient，调试结果可以在 nacos 的管理页面查看
# 服务注册
node ./registerInstance.js
# 取消注册
node ./deregisterInstance.js
# 服务发现
node ./getAllInstances.js
# 监听变化
node ./subscribe.js

# Nacos 配置中心 NacosConfigClient，调试结果可以在 nacos 的管理页面查看
node ./nacosConfigTest.js
```
