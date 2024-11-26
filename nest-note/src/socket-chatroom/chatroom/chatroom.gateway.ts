import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatroomService } from './chatroom.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';

@WebSocketGateway()
export class ChatroomGateway {
  constructor(private readonly chatroomService: ChatroomService) {}

  @WebSocketServer() server: Server;

  // joinRoom 路由，它接收 room 和 nickname 参数，把 client 加入对应房间。然后给这个房间发送一个欢迎消息。
  @SubscribeMessage('joinRoom')
  joinRoom(client: Socket, payload: any): void {
    console.log(payload);

    client.join(payload.roomName);
    this.server.to(payload.roomName).emit('message', {
      nickName: payload.nickName,
      message: `${payload.nickName} 加入了 ${payload.roomName} 房间`,
    });
  }

  // sendMessage 路由，接收房间和消息，可以给对应 room 发送消息
  @SubscribeMessage('sendMessage')
  sendMessage(client: Socket, payload: any): void {
    console.log(payload);

    this.server.to(payload.room).emit('message', {
      nickName: payload.nickName,
      message: payload.message,
    });
  }

  // 参数 (client: Socket, payload: any) 等价于 (@MessageBody() payload: any)
  @SubscribeMessage('createChatroom')
  create(@MessageBody() createChatroomDto: CreateChatroomDto) {
    return this.chatroomService.create(createChatroomDto);
  }
}
