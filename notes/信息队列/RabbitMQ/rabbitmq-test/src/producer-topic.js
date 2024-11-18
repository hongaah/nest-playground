import * as amqp from 'amqplib';

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

// 生产者端创建叫 direct-test-exchange2 的 topic 类型的 Exchange，然后发三条消息
await channel.assertExchange('direct-test-exchange2', 'topic');

channel.publish('direct-test-exchange2', 'aaa.1', Buffer.from('hello1'));
channel.publish('direct-test-exchange2', 'aaa.2', Buffer.from('hello2'));
channel.publish('direct-test-exchange2', 'bbb.1', Buffer.from('hello3'));
