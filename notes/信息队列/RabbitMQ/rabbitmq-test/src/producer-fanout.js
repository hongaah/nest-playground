import * as amqp from 'amqplib';

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

// fanout 是广播消息到 Exchange 下的所有队列，不需要指定 routing key，计算指定了也会忽略。
await channel.assertExchange('direct-test-exchange3', 'fanout');

channel.publish('direct-test-exchange3', '', Buffer.from('hello1'));
channel.publish('direct-test-exchange3', '', Buffer.from('hello2'));
channel.publish('direct-test-exchange3', '', Buffer.from('hello3'));
