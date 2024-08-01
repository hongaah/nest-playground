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


## 日志报错 2024/08/01 16:18:38 [error] 63284#70448: *4 CreateFile() "E:\nginx-1.26.1/html/222" failed (2: The system cannot find the file specified), client: 192.168.153.144, server: localhost, request: "GET /222 HTTP/1.1", host: "192.168.153.144"

在 Nginx 配置中，return 200 $uri; 会尝试返回请求的 URI 作为响应内容。但是，如果指定的文件不存在，Nginx 会尝试从文件系统读取该文件，这会导致错误。你看到的错误消息表明 Nginx 在尝试访问路径 E:\nginx-1.26.1/html/222 时找不到文件。

要解决这个问题并返回请求的 URI 作为纯文本响应，可以使用 return 指令直接返回一个固定的字符串，而不是尝试从文件系统读取文件。

```conf
server {
    listen 80;
    server_name localhost;

    location /222 {
        default_type text/plain;
        # 注意，这里使用双引号将 $uri 变量括起来，以确保其被正确解析。
        return 200 "$uri";
    }

    # 根位置，避免文件系统查找
    location / {
        root   html;
        index  index.html index.htm;
    }
}

```