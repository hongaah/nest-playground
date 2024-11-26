import * as amqp from 'amqplib';

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

// assertQueue 是如果没有就创建队列，有的话就直接返回。
const { queue } = await channel.assertQueue('aaa');
channel.consume(
  queue,
  (msg) => {
    console.log(msg.content.toString());
  },
  { noAck: true },
);
