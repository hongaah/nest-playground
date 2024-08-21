# MongoDB

NoSQL 数据库的一种，介于关系数据库和非关系数据库之间，是非关系数据库当中功能最丰富、最像关系数据库的。

## intro

MongoDB 是一个基于分布式文件存储的数据库。由 C++ 语言编写，旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。它是 NoSQL 数据库的一种，介于关系数据库和非关系数据库之间，是非关系数据库当中功能最丰富、最像关系数据库的。

MongoDB 的逻辑结构是一种层次结构，其支持的数据结构非常松散，是类似 json 的 bson 格式，因此可以存储对象形式的数据，比较复杂的数据类型。最大的特点是它支持的查询语言非常强大，其语法有点类似于面向对象的查询语言，几乎可以实现类似关系数据库单表查询的绝大部分功能，而且还支持对数据建立索引。

## 概念

- 数据库（database）：数据库是一个数据仓库，数据库服务下可以创建很多数据库，数据库中可以存放很多集合
- 集合（collection）：集合类似于 JS 中的数组，类似 sql 的 table，在集合中可以存放很多文档
- 文档（document）：文档是数据库中的最小单位，类似于 JS 中的对象，可以存任意结构的 document

## setup

- mongoDB Compass GUI：安装 [MongoDB 预编译二进制包](https://www.mongodb.com/download-center#community) 创建数据库和日志文件的目录，配置文件 mongod.cfg。你可能会发现 MongoDB bin 文件找不到了，可以通过查找 mongo 服务确定：bash: `services.msc`
- [MongoDB Shell](https://www.mongodb.com/try/download/shell)：从 MongoDB 6.0 版本开始，MongoDB Shell (mongo.exe) 不再自动包含在 MongoDB 的二进制发行版中。
- docker: `docker run mongo:latest --name mongo-test -p 27017:27017 -v /tmp/aaa:/data/db -d`，docker desktop - terminal：bash: `mongosh` 就可以 mongo crud了。
- docs：https://www.mongodb.com/zh-cn/docs/mongodb-shell/crud，https://www.arryblog.com/vip/nodejs/mongodb.html

## mongoose

在 node 中操作 mongodb，需要使用 mongoose。
mongoose 是一个 mongodb 的 object document mapper，它提供了一些 api 来操作 mongodb。
主要是通过 Schema 描述形状，然后创建 Model，通过一个个 model 对象保存数据和做 CRUD。

- [node & mongoose](./mongoose/)
- [nest & mongoose](src/my-mongoose)
