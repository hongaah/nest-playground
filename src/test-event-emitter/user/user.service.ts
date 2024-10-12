import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserService {
  @Inject(EventEmitter2)
  private eventEmitter: EventEmitter2;

  create(createUserDto: CreateUserDto) {
    this.eventEmitter.emit('user.register', {
      username: createUserDto.username,
      email: createUserDto.email,
    });

    return 'This action adds a new user';
  }
}
