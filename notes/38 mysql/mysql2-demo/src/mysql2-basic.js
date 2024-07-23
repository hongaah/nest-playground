// 运行：node index.js
const mysql = require('mysql2');

// 连接 mysql server
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'hazel',
  database: 'practice',
});

// results 是结果，fields 是一些元信息，比如字段名这些。
connection.query('SELECT * FROM customers', function (err, results, fields) {
  console.log(results);
  console.log(fields.map((item) => item.name));
});

// 查询也可以指定占位符
connection.query(
  'SELECT * FROM customers WHERE name LIKE ?',
  ['李%'],
  function (err, results, fields) {
    console.log(results);
    console.log(fields.map((item) => item.name));
  },
);

// 插入一条数据
connection.execute(
  'INSERT INTO customers (name) VALUES (?)',
  ['hazel'],
  (err, results, fields) => {
    console.log(err);
  },
);

// 修改数据
connection.execute(
  'UPDATE customers SET name="hong" where name="hazel"',
  (err) => {
    console.log(err);
  },
);

// 删除数据
connection.execute('DELETE  FROM customers where name=?', ['hong'], (err) => {
  console.log(err);
});
