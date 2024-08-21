import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MyMongooseService } from './my-mongoose.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Controller('my-mongoose/dog')
export class MyMongooseController {
  constructor(private readonly myMongooseService: MyMongooseService) {}

  @Post()
  create(@Body() createDogDto: CreateDogDto) {
    return this.myMongooseService.create(createDogDto);
  }

  @Get()
  findAll() {
    return this.myMongooseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.myMongooseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMyMongooseDto: UpdateDogDto) {
    return this.myMongooseService.update(id, updateMyMongooseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.myMongooseService.remove(id);
  }
}
