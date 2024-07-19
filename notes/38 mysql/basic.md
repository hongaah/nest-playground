## 数据类型

mysql 设计了这么多的数据类型，一个目的是存储更丰富的信息，另一个就是尽可能的节省存储空间，看名字就可以看出来，就是存储空间的大小不同

整数类的有：TINYINT、SMALLINT、MEDIUMINT、INT 和 BIGINT
浮点型数字的有 FLOAT、DOUBLE
定点型数字的有 DECIMAL、MUMARIC
字符串型的有 CHAR、VARCHAR、TEXT和 BLOB
日期型的有 DATE、TIME、DATETIME、TIMESTAMP

常用的类型：
INT：存储整数
VARCHAR(100): 存储变长字符串，可以指定长度
CHAR：定长字符串，不够的自动在末尾填充空格
DOUBLE：存储浮点数
DATE：存储日期 2023-05-27
TIME：存储时间 10:13
DATETIME：存储日期和时间 2023-05-27 10:13
TIMESTAMP：存储日期时间的，但是范围小一点，而且会转为中央时区 UTC 的时间来存储
TEXT：长文本类型，可以存储 65535 长度的字符串

## sql 的分类和基本语法

sql 的分类，sql 是分为好几种的：
创建数据库、创建表等修改结构：DDL（Data Definition Language），
增删改：DML（Data Manipulate Language）
查询数据：DQL（Data Query Language）

sql 语句规范：
- 每条语句都要有分号;
- sql 语句不区分大小写，用大写只是关键词更容易区分一些。
- sql 语句有用单双引号，反引号或不加引号：当作字符串值用的时候，需要加单引号或者双引号。当作表名、列名用的时候，用反引号或者不加引号。

sql 查询语法和函数:

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