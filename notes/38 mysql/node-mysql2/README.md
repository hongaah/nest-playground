# 数据库连接

最基本的使用：需要操作数据库的时候，建立连接，用完之后释放连接。

数据库的连接建立还是很耗时的，而且一个连接也不够用。我们一般都是用连接池来管理：
只要把 createConnection 换成 createPool 就好了。query 或者 execute 的时候会自动从 pool 中取 connection 来用，用完会放回去。
