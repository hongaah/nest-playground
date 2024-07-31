
# Docker + Nginx 结合使用
# 用于在宿主机和容器之间复制文件和目录的
docker cp nginx1:/usr/share/nginx/html ~/nginx-html
docker cp  ~/nginx-html nginx1:/usr/share/nginx/html-xxx

# 强制结束所有 Nginx 进程
taskkill /F /IM nginx.exe
# 确认 Nginx 已停止，如果没有输出，则表示 Nginx 已经停止。
tasklist /FI "IMAGENAME eq nginx.exe"

# 启动 Nginx 服务
nginx
# 启动 nginx
start nginx
# 按照指定配置去启动 nginx
nginx.exe -c conf/nginx.conf
# 检测 nginx 是否配置正确
nginx -t -c conf/nginx.conf
# 修改配置后重新加载生效
nginx -s reload
# 快速停止 nginx，可能并不保存相关信息
nginx -s stop
# 完整有序的停止 nginx，并保存相关信息
nginx -s quit
