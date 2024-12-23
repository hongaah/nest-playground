const mysql = require('mysql2/promise');

(async function () {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'hazel',
    database: 'practice',
    // 如果现在没有可用连接了，那就等待，设置为 false 就是直接返回报错
    waitForConnections: true,
    // 指定最多有多少个连接
    connectionLimit: 10,
    // 指定最多有多少个空闲的，超过这个数量的空闲连接会被释放。
    maxIdle: 10,
    // 空闲连接的过期时间，超过这个时间会被释放。
    idleTimeout: 60000,
    // 可以排队的请求数量，超过这个数量就直接返回报错说没有连接了。设置为 0 就是排队没有上限。
    queueLimit: 0,
    // 保持心跳
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

  // query 或者 execute 的时候会自动从 pool 中取 connection 来用，用完会放回去。
  const [results, fields] = await pool.query('select * from customers');
  console.log(results);
  console.log(fields.map((item) => item.name));

  // 或者也可以手动取 connection
  const connection = await pool.getConnection();
  const [results1] = await connection.query('select * from orders');
  console.log(results1);
})();
