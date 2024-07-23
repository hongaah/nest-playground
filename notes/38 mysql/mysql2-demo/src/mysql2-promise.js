const mysqlPromise = require('mysql2/promise');

// promise
(async function () {
  const connection = await mysqlPromise.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'hazel',
    database: 'practice',
  });

  const [results, fields] = await connection.query('SELECT * FROM customers');
  console.log(results);
  console.log(fields.map((item) => item.name));
})();
