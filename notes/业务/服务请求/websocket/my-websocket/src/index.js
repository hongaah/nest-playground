const MyWebSocket = require('./ws');

// WebSocket 服务
const ws = new MyWebSocket({ port: 8080 });

// 监听客户端发送的消息
ws.on('data', (data) => {
  console.log('receive data:' + data);

  // 20s 后向客户端发送一次数据
  setInterval(() => {
    ws.send(data + ' ' + Date.now());
  }, 20000);
});

ws.on('close', (code, reason) => {
  console.log('close:', code, reason);
});
