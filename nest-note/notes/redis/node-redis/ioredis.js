import Redis from 'ioredis';

const redis = new Redis();

const res = await redis.keys('*');
console.log(res);

const res1 = await redis.hmset('bike:1', {
  model: 'Deimos',
  brand: 'Ergonom',
  type: 'Enduro bikes',
  price: 4972,
});
console.log(res1);

const res2 = await redis.hget('bike:1', 'model');
console.log(res2);
