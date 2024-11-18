import * as amqp from 'amqplib';

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

await channel.assertExchange('direct-test-exchange4', 'headers');

// 对比 direct 交换机，是从匹配 routing key 变成了匹配 header
channel.publish('direct-test-exchange4', '', Buffer.from('hello1'), {
  headers: {
    name: 'xxx',
  },
});
channel.publish('direct-test-exchange4', '', Buffer.from('hello2'), {
  headers: {
    name: 'xxx',
  },
});
channel.publish('direct-test-exchange4', '', Buffer.from('hello3'), {
  headers: {
    name: 'yyy',
  },
});
