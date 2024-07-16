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





