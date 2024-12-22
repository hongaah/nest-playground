
-- 找出 new_schema_demo.student 表里的最大年龄的人的具体信息
SELECT * FROM new_schema_demo.student WHERE age = (SELECT MAX(age) FROM new_schema_demo.student);
SELECT * FROM new_schema_demo.student ORDER BY age DESC LIMIT 1;
SELECT TOP 1 * FROM new_schema_demo.student ORDER BY age DESC;


-- 需求 1: 查询每个客户的订单总金额
select c.name as 客户名称, sum(o.total_amount) as 订单总金额 from practice.customers c join practice.orders o on c.id = o.customer_id group by c.id order by 订单总金额 desc LIMIT 0,3;


-- 需求 2: 查询每个客户的订单总金额，并计算其占比
-- 子查询 子查询拿不到外层查询定义的简称
select c.name as 客户名称, sum(o.total_amount) as 订单总金额, sum(o.total_amount) / (select sum(total_amount) from orders) as 总金额占比 from customers c join orders o on c.id = o.customer_id group by c.id order by 订单总金额;


-- 需求 3：查询每个客户的订单总金额，并列出每个订单的商品清单
select customers.name, orders.order_date, orders.total_amount, order_items.product_name, order_items.quantity, order_items.price
 from customers
 join orders on customers.id = orders.customer_id
 join order_items on orders.id = order_items.order_id
 order by customers.name, orders.order_date;


-- 需求 4：查询每个客户的订单总金额，并列出每个订单的商品清单，同时只显示客户名字姓“张”的客户的记录：
select customers.name, orders.order_date, orders.total_amount, order_items.product_name, order_items.quantity, order_items.price
 from customers
 join orders on customers.id = orders.customer_id
 join order_items on orders.id = order_items.order_id
 where customers.name like '张%'
 order by customers.name, orders.order_date;

-- 需求 5:查询每个客户的订单总金额，并列出每个订单的商品清单，同时只显示订单日期在2022年1月1日到2022年1月3日之间的记录
select customers.name, orders.order_date, orders.total_amount, order_items.product_name, order_items.quantity, order_items.price
 from customers
 join orders on customers.id = orders.customer_id
 join order_items on orders.id = order_items.order_id
 where orders.order_date between '20220101' and '20220103'
 order by customers.name, orders.order_date;

-- 需求 6：查询每个客户的订单总金额，并计算商品数量，只包含商品名称包含“鞋”的商品，商品名用-连接，显示前 3 条记录：
select
  customers.name,
  GROUP_CONCAT(order_items.product_name SEPARATOR '-') as 商品名称,
  sum(orders.total_amount) as 订单总金额,
  count(distinct order_items.id) as 商品数量
  from customers
  join orders on customers.id = orders.customer_id
  join order_items on orders.id = order_items.order_id
  where order_items.product_name like '%鞋%'
  group by customers.name
  order by 订单总金额 desc
  limit 3;


-- 需求 7: 查询存在订单的客户
select * from customers where id in (select customer_id from orders);
select * from customers where EXISTS (select 1 from orders where customers.id = orders.customer_id);


-- 需求 8: 将王磊的订单总金额打九折
update orders set total_amount = total_amount * 0.9 where customer_id in (select id from customers where name = '王磊');

select customers.name, orders.total_amount as '订单总金额', orders.order_date from customers
join orders on customers.id = orders.customer_id
where customers.name = '王磊';
