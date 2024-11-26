import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { WsService } from './ws.service';
import { CreateWDto } from './dto/create-w.dto';
import { UpdateWDto } from './dto/update-w.dto';
import { Observable } from 'rxjs';
import { Server } from 'socket.io';

// @WebSocketGateway()声明这是一个处理 weboscket 的类，默认的端口和 http 服务 app.listen 的那个端口一样
@WebSocketGateway(3001)
export class WsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly wsService: WsService) {}

  // websocket 服务端的生命周期，在生命周期函数里可以拿到实例对象。
  handleDisconnect(client: Server) {
    console.log('handleDisconnect', client);
  }
  handleConnection(client: Server, ...args: any[]) {
    console.log('handleConnection', ...args);
  }
  afterInit(server: Server) {
    console.log('afterInit', server);
  }

  // @SubscribeMessage 指定处理的消息
  @SubscribeMessage('createW')
  create(@MessageBody() createWDto: CreateWDto) {
    // @MessageBody() 取出传过来的消息内容
    return this.wsService.create(createWDto);
  }

  @SubscribeMessage('findAllWs')
  findAll() {
    return {
      // 指定返回的事件名
      event: 'hazel',
      data: this.wsService.findAll(),
    };
  }

  // 不定时返回数据，返回一个 Observable 对象
  @SubscribeMessage('observeData')
  observeData() {
    return new Observable((observer) => {
      observer.next({ event: 'observeData', data: { msg: 'aaa' } });

      setTimeout(() => {
        observer.next({ event: 'observeData', data: { msg: 'bbb' } });
      }, 2000);

      setTimeout(() => {
        observer.next({ event: 'observeData', data: { msg: 'ccc' } });
      }, 5000);
    });
  }

  // 注入实例 1
  // 使用 @ConnectedSocket() 注入实例，可以拿到当前连接的 socket 对象，使用具体平台的 api（Nest 默认使用 socket.io 包实现 WebSocket 功能，需要安装）。但是和具体的平台耦合了，不建议这样写。
  @SubscribeMessage('connectCurrentSocket')
  connectCurrentSocket(
    @MessageBody() id: number,
    @ConnectedSocket() server: Server,
  ) {
    server.emit('hazel', 888);
    return this.wsService.findOne(id);
  }

  // 注入实例 2
  // 使用 @WebSocketServer 注入实例
  @WebSocketServer() server: Server;

  @SubscribeMessage('connectCurrentSocket2')
  connectCurrentSocket2(@MessageBody() createWDto: CreateWDto) {
    this.server.emit('hazel', 777);
    return this.wsService.create(createWDto);
  }

  @SubscribeMessage('findOneW')
  findOne(@MessageBody() id: number) {
    return this.wsService.findOne(id);
  }

  @SubscribeMessage('updateW')
  update(@MessageBody() updateWDto: UpdateWDto) {
    return this.wsService.update(updateWDto.id, updateWDto);
  }

  @SubscribeMessage('removeW')
  remove(@MessageBody() id: number) {
    return this.wsService.remove(id);
  }
}
