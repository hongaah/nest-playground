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

## Node 里操作数据库的两种方式

一种是直接用 mysql2 连接数据库，发送 sql 来执行。🌰：node-mysql2

一种是用 ORM 库，比如 typeorm，它是基于 class 和 class 上的装饰器来声明和表的映射关系的，然后对表的增删改查就变成了对象的操作以及 save、find 等方法的调用，它会自动生成对应的 sql。🌰：node-TypeORM

主流的方案还是 ORM 的方案
