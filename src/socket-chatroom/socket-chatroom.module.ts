import { Module } from '@nestjs/common';
import { SocketChatroomService } from './socket-chatroom.service';
import { SocketChatroomController } from './socket-chatroom.controller';
import { ChatroomModule } from './chatroom/chatroom.module';

@Module({
  controllers: [SocketChatroomController],
  providers: [SocketChatroomService],
  imports: [ChatroomModule],
})
export class SocketChatroomModule {}
