import * as amqp from 'amqplib';

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

const { queue } = await channel.assertQueue('bbb');

// 每次最多取回 3 条消息来处理
channel.prefetch(3);

const currentTask = [];
channel.consume(
  queue,
  (msg) => {
    currentTask.push(msg);
    console.log('收到消息：', msg.content.toString());
  },
  // noAck 设置为 false 了，也就是不自动确认
  { noAck: false },
);

// 每隔 1 秒，手动确认一次
setInterval(() => {
  const curMsg = currentTask.pop();
  channel.ack(curMsg);
}, 1000);
