修改 nginx.conf 配置不生效，html/ 下目录修改了会生效，使用了以下方法：

1. 重启 nginx

nginx -s reload 报错：无法将“nginx”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正
确，然后再试一次。
./nginx -s reload 不生效
双击运行 nginx.exe 不生效

过一会刷新页面就好了，但重新修改配置又不行
出现一个新问题，配置了路由 /login，访问 http://localhost:80/login，可以访问到新配置的页面，但是访问 http://localhost:81/login/，访问的是旧页面。
