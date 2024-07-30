# 重新加载配置文件
nginx -s reload

# Docker + Nginx 结合使用
# 用于在宿主机和容器之间复制文件和目录的
docker cp nginx1:/usr/share/nginx/html ~/nginx-html
docker cp  ~/nginx-html nginx1:/usr/share/nginx/html-xxx

# 启动nginx
start nginx
# 按照指定配置去启动nginx
nginx.exe -c conf/nginx.conf
# 检测nginx是否配置正确
nginx -t -c conf/nginx.conf
# 修改配置后重新加载生效
nginx -s reload
# 快速停止nginx,可能并不保存相关信息
nginx -s stop
# 完整有序的停止nginx,并保存相关信息
nginx -s quit