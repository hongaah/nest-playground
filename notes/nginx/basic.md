# nginx

Nginx 是流行的服务器，一般用它对静态资源做托管、对动态资源做反向代理。

默认的 html 路径是 /usr/share/nginx/html
默认配置文件 nginx.conf 实现一些全局配置，错误日志的目录

## Docker + Nginx 结合使用

拉一个 nginx 镜像启动一个容器，端口映射宿主机的端口号 xx 到容器内的 80，访问 http://localhost:xx 就可以看到 nginx 页面了。

如果要修改配置文件，可以用以下方式，命令或挂载数据卷。

```sh
# 宿主机和容器之间复制文件和目录
$ docker cp nginx1:/usr/share/nginx/html ~/nginx-html
$ docker cp  ~/nginx-html nginx1:/usr/share/nginx/html-xxx
``` 

指定数据卷，挂载本地的 ~/nginx-config 目录到容器内的 /etc/nginx/conf.d 目录。这样本地修改了，容器内也同样修改了。

## 静态资源托管

！注意：修改 nginx.conf 配置后，需要重启 nginx 才生效。

```conf :nginx.conf
# location 语法
# 语法优先级：精确匹配（=） > 高优先级前缀匹配（^~） > 正则匹配（~*） > 普通前缀匹配

# 精确匹配 =
location = /111/ {
    default_type text/plain;
    return 200 "111 success";
}

# 普通前缀匹配
location /222 {
    default_type text/plain;
    # 注意，这里使用双引号将 $uri 变量括起来，以确保其被正确解析。
    return 200 "$uri";
}

# 正则匹配 ~
location ~ ^/333/bbb.*\.html$ {
    default_type text/plain;
    return 200 "$uri";
}

# 正则匹配 ~ 不区分大小写 *
location ~* ^/444/AAA.*\.html$ {
    default_type text/plain;
    return 200 $uri;
}

# 高优先级前缀匹配 ^~
location ^~ /444 {
    default_type text/plain;
    return 200 'xxxx';
}

# 删除前缀
# 用 rewrite 把 url 重写了，比如 /api/xxx 变成了 /xxx
location ^~ /api {
  rewrite ^/api/(.*)$ /$1 break;
  proxy_pass http://192.168.1.6:3001;
}

# root 和 alias 的区别：拼接路径时是否包含匹配条件的路径
# 比如匹配 /222/xxx/yyy.html
location /222 {
    # alias 会把去掉 /222 之后的部分路径拼接在后面，也就是会查找 /dddd/xxx/yyy.html 文件
    alias /dddd;
}

location /222 {
    # root 会把整个 uri 作为路径拼接在后面，也就是会查找 /dddd/222/xxx/yyy.html 文件
    root /dddd;
}

# try_files 指令
# 配置根位置 / 路径，返回 html/web 目录下的 index.html 文件
location / {
    root   html/web;
    # 设置默认的索引文件为 index.html
    index  index.html;
    # try_files 指令，如果匹配到 $uri 文件，就返回 $uri 文件，否则返回 $uri/ 文件，最后返回 /index.html 文件
    try_files $uri $uri/ /index.html;
}

# 配置 /xxx 路径，返回 html/web 目录下的 index.html 文件
location /xxx {
    alias html/web;
    index index.html;
    try_files $uri $uri/ /index.html;
}

# 根位置，避免文件系统查找
; location / {
;     root   html;
;     index  index.html index.htm;
; }

```

## 动态资源的反向代理

第一个代理是代理的用户请求，和用户请求方向一致，这叫做正向代理。
第二个代理是代理服务器处理用户请求，和用户请求方向相反，叫做反向代理。

nginx 这一层充当一个反向代理服务器的作用，可以做很多事情比如透明地修改请求、响应，实现负载均衡。

```conf :nginx.conf
# 根据前缀匹配 /api 开头的 url， ^~ 是提高优先级用的
location ^~ /api {
    # 代理到 localhost:3000 
    proxy_pass http://192.168.1.6:3000;

    # 修改 header
    proxy_set_header name hazel;
}
```

### 负载均衡

负载均衡，把请求按照一定的规则分到不同的服务器

比如现在有两个 nest 服务器，一个 nginx 服务器，nginx 使用负载均衡处理请求。这时候我访问 http://localhost:81/api 刷新 5 次页面，可以看到两个 nest 服务，一个 3 次，一个 2 次。

```conf
# 在 upstream 里配置代理的目标服务器的所有实例
upstream nest-server {
  server 192.168.1.6:3000;
  server 192.168.1.6:3001;
}

server {
  listen 80;
  server_name localhost;

  location ^~ /api {
    # 通过 upstream 的名字来指定
    proxy_pass http://nest-server;
  }
}
```

负载均衡策略
- 轮询：（默认）
- weight 带权重的轮询：在轮询基础上增加权重，也就是轮询到的几率不同。（默认是 1）
- ip_hash：按照 ip 的 hash 分配，保证每个访客的请求固定访问一个服务器，解决 session 问题。
- fair：按照响应时间来分配，这个需要安装 nginx-upstream-fair 插件。

```conf
# 负载均衡策略：weight 带权重的轮询。
# 比如访问了 8 次 http://localhost:81/api，看打印的日志来看，差不多就是 2:1 的轮询几率。
upstream nest-server {
  # 添加一个 weight=2，默认是 1，这样两个服务器轮询到的几率是 2 比 1。
  server 192.168.1.6:3000;
  server 192.168.1.6:3001 weight=2;
}
```

```conf
# 负载均衡策略：ip_hash
# 比如访问 http://localhost:81/api，可以看到一直请求到了一台服务器
upstream nest-server {
  ip_hash;
  server 192.168.1.6:3000;
  server 192.168.1.6:3001;
}
```
