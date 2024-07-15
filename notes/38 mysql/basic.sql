/*
where：查询条件，比如 where id=1
as：别名，比如 select xxx as 'yyy'
and: 连接多个条件
in/not in：集合查找，比如 where a in (1,2)
between and：区间查找，比如 where a between 1 and 10
limit：分页，比如 limit 0,5
order by：排序，可以指定先根据什么升序、如果相等再根据什么降序，比如 order by a desc,b asc
group by：分组，比如 group by aaa
having：分组之后再过滤，比如 group by aaa having xxx > 5
distinct：去重

sql 还可以用很多内置函数：
聚合函数：avg、count、sum、min、max
字符串函数：concat、substr、length、upper、lower
数值函数：round、ceil、floor、abs、mod
日期函数：year、month、day、date、time
条件函数：if、case
系统函数：version、datebase、user
类型转换函数：convert、cast、date_format、str_to_date
其他函数：nullif、coalesce、greatest、least
*/

-- 切换数据库
use `new_schema_demo`;

-- DDL（Data Definition Language）
-- 数据库表的创建、删除和清空表
CREATE SCHEMA `new_schema_demo` ;

-- 逻辑删除：status 用 0 表示未删除，1 表示已删除，这叫做逻辑删除。也就是删除的时候就是从 0 改成 1，但不会真正删除数据。
CREATE TABLE `new_schema_demo`.`student` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `age` INT NULL,
  `sex` INT NULL,
  `email` VARCHAR(60) NULL,
  `create_time` DATETIME NOT NULL,
  `status` INT NULL DEFAULT 0 COMMENT '是否删除， 0 表示未删除，1 表示已删除',
  PRIMARY KEY (`id`)) CHARSET=utf8mb4;

TRUNCATE `new_schema_demo`.`student`;
DROP TABLE `new_schema_demo`.`student`;

-- DML（Data Manipulate Language），增删改
INSERT INTO `new_schema_demo`.`student` (`name`, `age`, `sex`, `create_time`) VALUES ('77', '22', '1', '2024-07-12 00:00:00');
INSERT INTO `new_schema_demo`.`student` (`name`, `age`, `sex`, `create_time`) VALUES ('77', '22', '1', '2024-07-12 00:00:00'), ('77', '22', '1', '2024-07-12 00:00:00');
UPDATE `new_schema_demo`.`student` SET `name` = 'ab' WHERE (`id` = '1');
UPDATE `new_schema_demo`.`student` SET `name` = 'A1', `age` = '21', `sex` = '0', `email` = 'AAA@qq.com' WHERE (`id` = '3');
DELETE FROM `new_schema_demo`.`student` WHERE (`id` = '5');

-- DQL（Data Query Language），查询数据
SELECT * FROM new_schema_demo.student;
-- 指定查询的列的
SELECT name, age FROM new_schema_demo.student;
-- 通过 as 修改返回的列名
SELECT name as 名字, age as 年龄 FROM new_schema_demo.student where age >= 19;
-- 条件可以是 and 连接的多个
SELECT name as 名字, age as 年龄 FROM new_schema_demo.student where age >= 19 and sex = '0';
-- 可以用 LIKE 做模糊查询
select * from new_schema_demo.student where name like '王%';
-- 通过 in 来指定一个集合
select * from new_schema_demo.student where age in (17, 18, 19);
-- 也可以 not in
select * from new_schema_demo.student where age not in (17, 18, 19);
-- 可以通过 between and 来指定一个区间
select * from new_schema_demo.student where age between 18 and 20;
-- 如果觉得返回的数量太多，可以分页返回，拿到前10条数据
SELECT * FROM new_schema_demo.student limit 0, 10;
-- 如果觉得返回的数量太多，可以分页返回，拿到前10条数据 简写
SELECT * FROM new_schema_demo.student limit 10;
-- 如果觉得返回的数量太多，可以分页返回，拿到第二页的10条数据
SELECT * FROM new_schema_demo.student limit 10, 10;
-- 可以通过 order by 来指定排序
SELECT * FROM new_schema_demo.student order by age desc;
-- order by 指定根据 create_time 升序排列，如果 create_time 相同再根据 age 降序排列。
SELECT name, age, create_time FROM new_schema_demo.student order by create_time asc, age desc;

-- 分组统计
-- 聚合函数：用于对数据的统计，比如 AVG、COUNT、SUM、MIN、MAX
select avg(age) as 平均年龄,count(*) as 人数,sum(age) as 总年龄,min(age) as 最低龄, max(age) as 最高龄 from new_schema_demo.student; 

-- 内置函数 count, * 就代表当前行, 统计表里有多少行
select count(*) as count from new_schema_demo.student;
-- 统计性别分别有多少人
select sex, count(*) as count from new_schema_demo.student group by sex;
-- 内置函数 AVG
SELECT sex as 性别, AVG(age) AS 平均年龄
    FROM new_schema_demo.student
    GROUP BY sex
    ORDER BY 平均年龄 DESC;
-- 分组统计之后还可以做进一步的过滤，但这时候不是用 where 了，而是用 having
SELECT sex as 性别, AVG(age) AS 平均年龄
    FROM new_schema_demo.student
    GROUP BY sex
    HAVING 平均年龄 > 20;

-- 查看有哪些年龄的人,可以用 distinct 去重
SELECT DISTINCT age FROM new_schema_demo.student;

-- 字符串函数：用于对字符串的处理，比如 CONCAT、SUBSTR、LENGTH、UPPER、LOWER
-- SUBSTR 第二个参数表示开始的下标（mysql 下标从 1 开始），第三个参数表示结束的下标，包含在内，可以不填；所以 substr('一二三',2,3) 的结果是 '二三'
SELECT CONCAT('name is ', name, ' student'), SUBSTR(name, 2, 3), LENGTH(name), UPPER('aa'), LOWER('TT') FROM new_schema_demo.student;

-- 数值函数：用于对数值的处理，比如 ROUND、CEIL、FLOOR、ABS、MOD。
-- ROUND 四舍五入、CEIL 向上取整、FLOOR 向下取整、ABS 绝对值、MOD 取模。
SELECT ROUND(1.234567, 2), CEIL(1.234567), FLOOR(1.234567), ABS(-1.234567), MOD(5, 2);

-- 日期函数：对日期、时间进行处理，比如 DATE、TIME、YEAR、MONTH、DAY
SELECT YEAR('2023-06-01 22:06:03'), MONTH('2023-06-01 22:06:03'),DAY('2023-06-01 22:06:03'),DATE('2023-06-01 22:06:03'), TIME('2023-06-01 22:06:03');

-- 条件函数：根据条件是否成立返回不同的值，比如 IF、CASE
-- if 函数适合单个条件
SELECT name, IF(age > 14, '10 前', '10 后') as 年龄 FROM new_schema_demo.student;
-- case 适合多个条件, 和 js 里的 swtch 语句很像
SELECT name, age, CASE WHEN age >=24 THEN '90' WHEN age >=14 THEN '00'ELSE '10' END AS '年代' FROM new_schema_demo.student;

-- 系统函数：用于获取系统信息，比如 VERSION、DATABASE、USER
select VERSION(), DATABASE(), USER();

-- 其他函数：NULLIF、COALESCE、GREATEST、LEAST
-- NULLIF：如果相等返回 null，不相等返回第一个值
select NULLIF(1,1), NULLIF(1,2);
-- COALESCE：返回第一个非 null 的值
select COALESCE(null, 1), COALESCE(null, null, 2)
-- GREATEST、LEAST：返回几个值中最大最小的
select GREATEST(1,2,3,4,5), LEAST(1,2,3,4,5);

-- 类型转换函数：转换类型为另一种，比如 CAST、CONVERT、DATE_FORMAT、STR_TO_DATE。
-- 因为 123 不是数字所以返回 3 
select greatest(1, '123',3);

-- 可以转换的类型有这些：
-- signed：整型；
-- unsigned：无符号整型
-- decimal：浮点型；
-- char：字符类型；
-- date：日期类型；
-- time：时间类型；
-- datetime：日期时间类型；
-- binary：二进制类型
select greatest(1, convert('123', signed),3);
select greatest(1, cast('123' as signed),3);

-- 日期格式化函数
SELECT DATE_FORMAT('2022-01-01', '%Y年%m月%d日');
SELECT STR_TO_DATE('2023-06-01', '%Y-%m-%d');
