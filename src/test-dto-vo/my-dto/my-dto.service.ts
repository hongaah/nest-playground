import { Injectable } from '@nestjs/common';
import { CreateMyDtoDto } from './dto/create-my-dto.dto';
import { UpdateMyDtoDto } from './dto/update-my-dto.dto';

@Injectable()
export class MyDtoService {
  create(createMyDtoDto: CreateMyDtoDto) {
    return 'This action adds a new myDto';
  }

  findAll() {
    return `This action returns all myDto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} myDto`;
  }

  update(id: number, updateMyDtoDto: UpdateMyDtoDto) {
    return `This action updates a #${id} myDto`;
  }

  remove(id: number) {
    return `This action removes a #${id} myDto`;
  }
}
