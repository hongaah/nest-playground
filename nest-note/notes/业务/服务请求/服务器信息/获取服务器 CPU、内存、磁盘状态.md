# 获取服务器 CPU、内存、磁盘状态

获取服务器信息：比如 CPU、内存、磁盘等

- cpu: `os.cpus()`
- memory: `os.totalmem()`、`os.freemem()`
- disk: `node-disk-info` npm 包
- 其他的服务器信息：`nodeDiskInfo.getDiskInfoSync()`

实现：

os.hostname：主机名
os.platform：操作系统
os.arch：操作系统架构
os.networkInterfaces：拿到所有网卡信息
os.totalmem：内存
os.freemem：内存
os.cpus：拿到的 `times.user`、`times.sys`、`times.idle` 分别代表用户代码占用的 cpu 时间、系统代码占用的 cpu 时间，空闲的 cpu 时间。基于这些就能算出 cpu 的使用率、空置率。

nest 🌰：src\server-status
node 🌰：notes\业务\服务请求\服务器信息\os.mjs
