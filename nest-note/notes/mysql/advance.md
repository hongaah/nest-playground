# 数据库进阶

## 多表查询
[SQL多表查询：SQL JOIN连接查询各种用法总结](https://blog.csdn.net/weixin_60528419/article/details/128701926)

### 数据表设计

- 一对一: 在从表里通过外键来关联主表的主键。

  比如一个用户只能有一个身份证, user 表叫主表，使用外键 user_id 引用它的 id 的 id_card 表是从表。

- 一对多：是通过在多的一方添加外键来引用一的一方的 id。
  比如一个部门有多个员工，department 表叫主表，使用外键 department_id 引用它的 id 的 employee 表是从表。设置级联方式为SET NULL，这样因为部门没了员工不一定也没了，可能还会分配到别的部门

- 多对多：通过中间表关联两个表。
  多对多不需要在双方保存彼此的外键，只要在中间表里维护这种关系即可。中间表的外键级联方式一定为 CASCADE，因为数据没了关系就没必要还留着了。
  多对多的表查询时 join 需要连接 3 个表来查询。

### 外键级联关系

主表数据 update 或者 delete 的时候，从表怎么办

- CASCADE：主表主键更新，从表关联记录的外键跟着更新，主表记录删除，从表关联记录删除
- SET NULL：主表主键更新或者主表记录删除，从表关联记录的外键设置为 null
- RESTRICT：只有没有从表的关联记录时，才允许删除主表记录或者更新主表记录的主键 id
- NO ACTION：同 RESTRICT，只是 sql 标准里分了 4 种，但 mysql 里 NO ACTION 等同于 RESTRICT

### 多表查询 join on

join 左边是左表, join 右边是右表, on 后面接关联方式

- inner join: 默认值, 只返回两个表有关联的记录
- left join: 额外返回没有关联记录的左表的记录
- right join: 额外返回没有关联记录的右表的记录

### 子查询

EXISTS：子查询返回结果，条件成立，反之不成立
NOT EXISTS：来查询所有没有员工的部门

子查询可以用在 select、insert、update、delete 语句

## 事务和隔离级别

当你修改多个表的时候，并且这些表的数据是有关联的时候，事务是必须的。要不全部成功，要不全部不成功。
基本上，只要写增删改的 sql，那都是要开事务的。

START TRANSACTION 开启事务后所有的 sql 语句都可以 ROLLBACK，除非执行了 COMMIT 完成这段事务。
还可以设置几个 SAVEPOINT，这样可以 ROLLBACK TO 任何一个 SAVEPOINT 的位置。
如果回滚了，那后面的操作都会失效，即不能跳到后面的步骤。

```sql
START TRANSACTION;

SAVEPOINT aaa;

UPDATE order_items SET quantity=1 WHERE order_id=3;

SAVEPOINT bbb;

UPDATE orders SET total_amount=200 WHERE id=3;

SAVEPOINT ccc;

-- 回滚到保存点 bbb
ROLLBACK TO SAVEPOINT bbb;
-- 回滚到保存点 ccc。如果先回滚到bbb，那 ccc 就没用了，报错Error Code: 1305. SAVEPOINT ccc does not exist
ROLLBACK TO SAVEPOINT ccc;


------- 以下为其他场景
-- 全部回滚
ROLLBACK;

-- 提交操作，无法回滚
-- 如果先执行了全部回滚，那即使commit，也会是回滚后的数据。
COMMIT;
```

### 事务隔离级别

事务还没提交的数据，别的事务能不能读取到，这就涉及到隔离级别的概念了。
这 4 种级别主要是数据一致性和性能的差别，一致性越好，并发性能就越差。需要根据实际情况来权衡。

- READ UNCOMMITTED：可以读到别的事务尚未提交的数据。【不可重复读，脏读，幻读】
  这就有个问题，你这个事务内第一次读的数据是 aaa，下次读可能就是 bbb 了，这个问题叫做不可重复读。而且，万一你读到的数据人家又回滚了，那你读到的就是临时数据，这个问题叫做脏读。

- READ COMMITTED：只读取别的事务已提交的数据。【不可重复读，幻读】
  这样是没有脏读问题了，读到的不会是临时数据。
  但是还是有可能你这个事务内第一次读的数据是 aaa，下次读可能是 bbb ，也就是不可重复读的问题依然存在。
  不只是数据不一样，可能你两次读取到的记录行数也不一样，这叫做幻读。

- REPEATABLE READ：在同一事务内，多次读取数据将保证结果相同。【幻读】
  这个级别保证了读取到的数据一样，但是不保证行数一样，也就是说解决了不可重复读的问题，但仍然存在幻读的问题。

- serializable: 串行化，在同一时间只允许一个事务修改数据，其他事务必须等待。【性能差】
  事务一个个执行，各种问题都没有了。
  但是负面影响就是性能很差，只能一个个的事务执行。


```sql
-- 查询当前的事务隔离级别，默认的隔离级别是 REPEATABLE READ
select @@transaction_isolation
```

## 视图、存储过程和函数

### 视图

视图就是把查询结果保存下来，可以对这个视图做查询，简化了查询语句并且也能隐藏一些字段。

- 简化查询，之前要写一堆 sql，现在只要查这个视图就好了
- 控制权限，让开发者只能看到需要的字段，其余的给隐藏掉
- 视图一般只用来做查询，因为它增删改的限制比较多，比如只有单表的视图可以增删改，并且要求不在视图里的字段都有默认值等

```sql
-- 创建视图 CREATE VIEW ... AS 就是把这个查询的结果建立一个视图
CREATE VIEW customer_orders AS 
  SELECT
    c.name AS customer_name, 
    o.id AS order_id, 
    o.order_date, 
    o.total_amount
  FROM customers c
  JOIN orders o ON c.id = o.customer_id;

-- 查看视图
select * from customer_orders;
```

### 存储过程

存储过程可以封装一些 sql，用的时候传入参数 CALL 一下就行。

delimiter 定义分隔符。`DELIMITER $$` 定义分隔符为 `$$`，因为默认是 `;` , 这样中间就可以写 `;` 了，不会中止存储过程的 sql。最后再恢复为之前的分隔符：`DELIMITER ;`

```sql
-- 创建存储过程
DELIMITER $$
CREATE PROCEDURE get_customer_orders(IN customer_id INT)
BEGIN
    SELECT o.id AS order_id, o.order_date, o.total_amount
    FROM orders o
  WHERE o.customer_id = customer_id;
END $$
DELIMITER ;

-- 调用存储过程
-- 会返回一个表
CALL get_customer_orders(5);
```

### 函数

函数是把一段 sql 或者其他逻辑封装起来，传参数调用返回值，用于查询表，计算表中某些值

```sql
-- 默认 mysql 是不允许创建函数的，需要先设置下这个变量
SET GLOBAL log_bin_trust_function_creators = 1;
```

```sql
-- 示例一：创建一个求平方的函数
DELIMITER $$
CREATE FUNCTION square(x INT)
-- 通过 RETURNS 声明返回值类型
RETURNS INT
BEGIN
  -- 声明一个 INT 类型的变量
  DECLARE result INT;
  SET result = x * x;
  RETURN result;
END $$
DELIMITER ;

-- 调用函数
CREATE VIEW order_items_view AS 
    SELECT product_name, price FROM practice.order_items;
select product_name, square(price) from order_items_view;
```


```sql
-- 示例二：创建一个函数 get_order_total，参数为 INT 类型的 order_id，返回值为 DECIMAL(10, 2) 类型
DELIMITER $$
CREATE FUNCTION get_order_total(order_id INT)
RETURNS DECIMAL(10,2)
BEGIN
  -- 声明 total 变量，执行查询订单详情表综合的 select 语句，把结果放到 total 变量里，也就是 SELECT INTO
	DECLARE total DECIMAL(10,2);
	SELECT SUM(quantity * price) INTO total
		FROM order_items
		WHERE order_id = order_items.order_id;
	RETURN total;
END $$
DELIMITER ;

-- 调用函数
select id, get_order_total(id) from orders;
```

