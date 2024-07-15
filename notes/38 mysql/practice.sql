
-- 找出 new_schema_demo.student 表里的最大年龄的人的具体信息
SELECT * FROM new_schema_demo.student WHERE age = (SELECT MAX(age) FROM new_schema_demo.student);
SELECT * FROM new_schema_demo.student ORDER BY age DESC LIMIT 1;
SELECT TOP 1 * FROM new_schema_demo.student ORDER BY age DESC;
