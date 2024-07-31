# nginx error log

error.log 和 access.log 文件中的记录了日志内容

## nginx : 无法将“nginx”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。

添加 nginx 路径到系统环境变量

## 修改 nginx.conf 配置不生效，html/ 下目录名修改了会生效

使用了以下方法：

1. 重启 nginx

./nginx -s reload - 不生效
双击运行 nginx.exe - 不生效
浏览器开无痕模式 - 不生效
nginx -s stop 停止并重新启动 Nginx - 不生效

过一会刷新页面就好了，但重新修改配置又不行了，访问的还是旧页面

打开 error.log 文件看到最新记录是 signal process started，表示 Nginx 收到了信号并启动了一个新的进程来处理该信号。这通常发生在发送信号给 Nginx 进程来重新加载配置、停止或重新启动服务时。这表明 Nginx 已经尝试重新加载配置。

2. 打开任务管理器，看到有很多 nginx.exe 进程，kill 掉所有进程，重启 nginx，问题解决。

```sh
# 强制结束所有 Nginx 进程
taskkill /F /IM nginx.exe

# 确认 Nginx 已停止，如果没有输出，则表示 Nginx 已经停止。
tasklist /FI "IMAGENAME eq nginx.exe"

# 启动 Nginx 服务
nginx

# 重启 Nginx 服务
nginx -s reload
```
