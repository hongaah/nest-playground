import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MyDtoService } from './my-dto.service';
import { CreateMyDtoDto } from './dto/create-my-dto.dto';
import { UpdateMyDtoDto } from './dto/update-my-dto.dto';

@Controller('my-dto')
export class MyDtoController {
  constructor(private readonly myDtoService: MyDtoService) {}

  @Post()
  create(@Body() createMyDtoDto: CreateMyDtoDto) {
    return this.myDtoService.create(createMyDtoDto);
  }

  @Get()
  findAll() {
    return this.myDtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.myDtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMyDtoDto: UpdateMyDtoDto) {
    return this.myDtoService.update(+id, updateMyDtoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.myDtoService.remove(+id);
  }
}
