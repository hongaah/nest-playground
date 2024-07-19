-- 子查询
SELECT * FROM student WHERE age = (SELECT MAX(age) FROM student);
SELECT * FROM student WHERE age > (SELECT AVG(age) FROM student);

INSERT INTO avg_price_by_category (category, avg_price) 
    SELECT category, AVG(price) FROM product GROUP BY category;

UPDATE employee SET name = CONCAT('技术-', name) 
    WHERE department_id = (
        SELECT id FROM department WHERE name = '技术部'
    );

DELETE FROM employee WHERE department_id = (
    SELECT id FROM department WHERE name = '技术部'
);


-- EXISTS、NOT EXISTS
-- 查询有员工的部门，子查询返回结果，条件成立，反之不成立。
SELECT name FROM department
  WHERE EXISTS (
    SELECT * FROM employee WHERE department.id = employee.department_id
  );

-- 查询所有没有员工的部门
SELECT name FROM department
  WHERE NOT EXISTS (
    SELECT * FROM employee WHERE department.id = employee.department_id
  );

-- 查询价格最高的产品的信息
SELECT name, price FROM product WHERE price = (SELECT MAX(price) FROM product);


-- 一对一表的设计
-- 用户表
CREATE TABLE `new_schema_demo`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL COMMENT '名字',
  PRIMARY KEY (`id`));

-- 身份证表
CREATE TABLE `new_schema_demo`.`id_card` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `card_name` VARCHAR(45) NOT NULL COMMENT '身份证号',
  `user_id` INT NULL COMMENT '用户 id',
  PRIMARY KEY (`id`),
  -- INDEX 是建立索引，索引名是 user_id_idx，这个是用于加速 user_id 的访问的。
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  -- CONSTRINT user_id FOREIGN KEY 是给 user_id 添加一个外键约束，然后 user_id REFERENCES user id 则是指定 user_id 引用这 user 表的 id 列
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `new_schema_demo`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- 一对一表的关联查询
-- JOIN ON，也就是连接 user 和 id_card 表，关联方式是 user.id = id_card.user_id，也就是 id_card 表中的外键关联 user 表的主键
SELECT * FROM user JOIN id_card ON user.id = id_card.user_id;
SELECT user.id, name, id_card.id as card_id, card_name FROM user JOIN id_card ON user.id = id_card.user_id;

-- LEFT JOIN
SELECT user.id, name, id_card.id as card_id, card_name 
    FROM user
    LEFT JOIN id_card ON user.id = id_card.user_id;

-- RIGHT JOIN
SELECT user.id, name, id_card.id as card_id, card_name 
    FROM user
    RIGHT JOIN id_card ON user.id = id_card.user_id;


-- 一对多表的设计
-- 部门表
CREATE TABLE `new_schema_demo`.`department` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

-- 员工表
CREATE TABLE `new_schema_demo`.`employee` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `department_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `department_id_idx` (`department_id` ASC) VISIBLE,
  CONSTRAINT `department_id`
    FOREIGN KEY (`department_id`)
    REFERENCES `new_schema_demo`.`department` (`id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL);

-- 一对多表的关联查询
select * from department
    join employee on department.id = employee.department_id
    where department.id = 5;

select * from department
    left join employee on department.id = employee.department_id;

select * from department
    right join employee on department.id = employee.department_id;


-- 多对多表的设计
-- 文章表
CREATE TABLE `article` (
 `id` INT NOT NULL AUTO_INCREMENT,
 `title` VARCHAR(50) NOT NULL,
 `content` TEXT NOT NULL,
 PRIMARY KEY (`id`)
) CHARSET=utf8mb4;

-- 标签表
CREATE TABLE `tag` (
 `id` INT NOT NULL AUTO_INCREMENT,
 `name` VARCHAR(50) NOT NULL,
 PRIMARY KEY (`id`)
);

-- 中间关系表
CREATE TABLE `new_schema_demo`.`article_tag` (
  `article_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  -- 复合主键
  PRIMARY KEY (`article_id`, `tag_id`), 
  INDEX `tag_id_idx` (`tag_id` ASC) VISIBLE,
  CONSTRAINT `article_id`
    FOREIGN KEY (`article_id`)
    REFERENCES `new_schema_demo`.`article` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `tag_id`
    FOREIGN KEY (`tag_id`)
    REFERENCES `new_schema_demo`.`tag` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

-- 查询 id 为 1 的 article 的所有标签
SELECT * FROM article a 
    JOIN article_tag at ON a.id = at.article_id
    JOIN tag t ON t.id = at.tag_id
    WHERE a.id = 1;

SELECT t.name AS 标签名, a.title AS 文章标题
    FROM article a 
    JOIN article_tag at ON a.id = at.article_id
    JOIN tag t ON t.id = at.tag_id
    WHERE a.id = 1;