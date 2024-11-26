import { Controller } from '@nestjs/common';
import { SocketChatroomService } from './socket-chatroom.service';

@Controller('socket-chatroom')
export class SocketChatroomController {
  constructor(private readonly socketChatroomService: SocketChatroomService) {}
}
