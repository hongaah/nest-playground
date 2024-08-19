import { createClient } from 'redis';

const client = createClient({
  socket: {
    host: 'localhost',
    port: 6379,
  },
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

// // 查询
// const value = await client.keys('*');
// console.log(value);

// 创建一个 hash 表
const res1 = await client.hSet('bike:1', {
  model: 'Deimos',
  brand: 'Ergonom',
  type: 'Enduro bikes',
  price: 4972,
});
console.log(res1); // 4

const res2 = await client.hGet('bike:1', 'model');
console.log(res2); // 'Deimos'

const res3 = await client.hGet('bike:1', 'price');
console.log(res3); // '4972'

const res4 = await client.hGetAll('bike:1');
console.log(res4);

await client.disconnect();
