import * as amqp from 'amqplib';

// 连接了 rabbitmq 服务，创建了一个名字为 aaa 的队列，并向队列中发送了一个消息。
const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

await channel.assertQueue('aaa');
await channel.sendToQueue('aaa', Buffer.from('hello'));
