import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserVo } from './vo/user.vo';

const database = [];
let id = 0;

@Injectable()
export class MyVoService {
  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    user.id = id++;
    database.push(user);

    return user;
  }

  /** vo: 直接返回数据库的数据 */
  findAll() {
    return database;
  }

  findOne(id: number) {
    return database.filter((item) => item.id === id).at(0);
  }

  /** vo: 返回 vo 文件定义的字段 */
  findAllByVo() {
    return database.map((item) => {
      return new UserVo({
        id: item.id,
        username: item.username,
        email: item.email,
      });
    });
  }

  findOneByVo(id: number) {
    return database
      .filter((item) => item.id === id)
      .map((item) => {
        return new UserVo({
          id: item.id,
          username: item.username,
          email: item.email,
        });
      })
      .at(0);
  }
}
