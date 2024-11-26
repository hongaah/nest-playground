const { EventEmitter } = require('events');
const http = require('http');
const crypto = require('crypto');

// 计算 Sec-WebSocket-Accept 的值
function hashKey(key) {
  const sha1 = crypto.createHash('sha1');
  sha1.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
  return sha1.digest('base64');
}

// 解析 WebSocket 协议的最终数据之后，传给处理程序之前，还要根据类型来处理下，因为内容分几种类型，也就是 opcode 有几种值
const OPCODES = {
  CONTINUE: 0,
  TEXT: 1, // 文本
  BINARY: 2, // 二进制
  CLOSE: 8,
  PING: 9,
  PONG: 10,
};

// mask key 解密数据算法也是固定的，用每个字节的 mask key 和数据的每一位做按位异或
function handleMask(maskBytes, data) {
  const payload = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i++) {
    payload[i] = maskBytes[i % 4] ^ data[i];
  }
  return payload;
}

// 编码数据
// 只处理数据长度小于 125 的情况
// opcode：第一个字节是 opcode，我们把第一位置 1，通过按位或的方式。服务端给客户端回消息不需要 mask，所以第二个字节就是 payload 长度。
// payload 数据放在后面
function encodeMessage(opcode, payload) {
  //payload.length < 126
  let bufferData = Buffer.alloc(payload.length + 2 + 0);

  let byte1 = parseInt('10000000', 2) | opcode; // 设置 FIN 为 1
  let byte2 = payload.length;

  bufferData.writeUInt8(byte1, 0);
  bufferData.writeUInt8(byte2, 1);

  payload.copy(bufferData, 2);

  return bufferData;
}

// 模拟 websocket
// 继承 EventEmitter 是为了可以用 emit 发送一些事件，外界可以通过 on 监听这个事件来处理。
class MyWebsocket extends EventEmitter {
  constructor(options) {
    super(options);

    // 创建一个 http 服务
    const server = http.createServer();
    server.listen(options.port || 8080);

    // 监听 upgrade 事件，当有客户端连接时，也就是收到了 Connection: upgrade 的 header 的时候，返回切换协议的 header。
    server.on('upgrade', (req, socket) => {
      this.socket = socket;
      socket.setKeepAlive(true);

      const resHeaders = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        'Sec-WebSocket-Accept: ' + hashKey(req.headers['sec-websocket-key']),
        '',
        '',
      ].join('\r\n');

      socket.write(resHeaders);

      socket.on('data', (data) => {
        // 监听客户端发送的消息，data 是一个 buffer 类型，需要解析
        const { opcode, realData } = this.processData(data);
        this.handleRealData(opcode, realData);
      });

      socket.on('close', (error) => {
        this.emit('close');
      });
    });
  }

  // 解析 buffer 数据得到最终的数据 opcode 和 realData
  processData(bufferData) {
    // 一个字节有 8 位，第一个字节的后四位是 opcode，用来表示数据的类型。
    // 读取 8 位无符号整数的内容，也就是一个字节的内容。参数是偏移的字节，这里是 0。
    // 通过位运算取出后四位
    const byte1 = bufferData.readUInt8(0);
    let opcode = byte1 & 0x0f;

    // 读取第二个字节
    const byte2 = bufferData.readUInt8(1);
    // 转成二进制字符串，然后截取第一位，判断是否是 1，是的话就是设置了掩码。
    const str2 = byte2.toString(2);

    // 存储当前处理到第几个字节
    let curByteIndex = 2;

    /**
     * payload 长度的计算：
     * payload 数据不一定有多长，可能需要 16 位存长度，可能需要 32 位。于是 websocket 协议就规定了如果那个 7 位的内容不超过 125，那它就是 payload 长度。如果 7 位的内容是 126，那就不用它了，用后面的 16 位的内容作为 payload 长度。如果 7 位的内容是 127，也不用它了，用后面那个 34 位的内容作为 payload 长度。
     */
    // payload 长度：默认截取后 7 位的子串，parseInt 成数字
    let payloadLength = parseInt(str2.substring(1), 2);

    if (payloadLength === 126) {
      // 读取 16 位的内容，也就是 2 个字节的内容，用 buffer.readUInt16BE 方法
      payloadLength = bufferData.readUInt16BE(2);
      curByteIndex += 2;
    } else if (payloadLength === 127) {
      payloadLength = bufferData.readBigUInt64BE(2);
      curByteIndex += 8;
    }

    /**
     * Mask
     *
     * 在读取数据之前，还有个 mask 要处理，这个是用来给内容解密的
     */
    const MASK = str2[0];
    let realData = null;

    if (MASK) {
      const maskKey = bufferData.slice(curByteIndex, curByteIndex + 4);
      curByteIndex += 4;
      const payloadData = bufferData.slice(
        curByteIndex,
        curByteIndex + payloadLength,
      );
      // 用 mask key 来解密数据
      realData = handleMask(maskKey, payloadData);
    } else {
      realData = bufferData.slice(curByteIndex, curByteIndex + payloadLength);
    }

    return {
      opcode,
      realData,
    };
  }

  // 根据接收到的是文本还是二进制数据来对内容作处理
  handleRealData(opcode, realDataBuffer) {
    switch (opcode) {
      // 文本类型
      case OPCODES.TEXT:
        this.emit('data', realDataBuffer.toString('utf8'));
        break;
      // 二进制类型
      case OPCODES.BINARY:
        this.emit('data', realDataBuffer);
        break;
      default:
        this.emit('close');
        break;
    }
  }

  // 发送数据：根据发送的是文本还是二进制数据来对内容作处理
  send(data) {
    let opcode;
    let buffer;
    if (Buffer.isBuffer(data)) {
      opcode = OPCODES.BINARY;
      buffer = data;
    } else if (typeof data === 'string') {
      opcode = OPCODES.TEXT;
      buffer = Buffer.from(data, 'utf8');
    } else {
      console.error('暂不支持发送的数据类型');
    }
    this.doSend(opcode, buffer);
  }

  doSend(opcode, bufferDatafer) {
    this.socket.write(encodeMessage(opcode, bufferDatafer));
  }
}

module.exports = MyWebsocket;
