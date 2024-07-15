# mysql

mysql 分为 server 和 client 两方面：

server 创建方式：
1. 可以通过 docker 跑了一个 mysql server，指定了端口、数据卷，并通过 MYSQL_ROOT_PASSWORD 环境变量指定了 root 的密码。
2. 安装 [mysql(包含 server workbench shell router)](https://blog.csdn.net/qq_59636442/article/details/123058454)

client：下载官方的 GUI 客户端 mysql workbench。workbench 可以可视化地创建一个 database 或者叫 schema。之后创建了一个表，指定了主键和其他列的约束、默认值等。通过 workbench 可视化创建字段后，会自动生成建表语句。

终端：
- C:\Program Files\MySQL\MySQL Shell 8.0\bin\mysqlsh.exe
- MySQL 8.0 Command Line Client

```sh :terminal
# docker 连接 mysql server
mysql -u root -p

show databases;
```


