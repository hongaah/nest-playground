import * as amqp from 'amqplib';

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

// 创建队列，durable: true 表示 RabbitMQ 重启，队列也会保留
await channel.assertQueue('bbb', { durable: true });

let i = 1;
setInterval(async () => {
  const msg = 'hello' + i;
  console.log('发送消息：', msg);
  await channel.sendToQueue('bbb', Buffer.from(msg));
  i++;
}, 500);
