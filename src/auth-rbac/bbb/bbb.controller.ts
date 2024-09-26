import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BbbService } from './bbb.service';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';
import { LoginGuard } from '../config/login.guard';
import { PermissionGuard } from '../config/permission.guard';
import { RequireLogin, RequirePermission } from '../config/custom-decorator';

@Controller('auth-rbac2/bbb')
@RequireLogin()
export class BbbController {
  constructor(private readonly bbbService: BbbService) {}

  @Post()
  @UseGuards(LoginGuard, PermissionGuard)
  create(@Body() createBbbDto: CreateBbbDto) {
    return this.bbbService.create(createBbbDto);
  }

  @Get()
  @RequirePermission('查询 bbb')
  @UseGuards(LoginGuard, PermissionGuard)
  findAll() {
    return this.bbbService.findAll();
  }

  @Get(':id')
  @UseGuards(LoginGuard, PermissionGuard)
  findOne(@Param('id') id: string) {
    return this.bbbService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(LoginGuard, PermissionGuard)
  update(@Param('id') id: string, @Body() updateBbbDto: UpdateBbbDto) {
    return this.bbbService.update(+id, updateBbbDto);
  }

  @Delete(':id')
  @UseGuards(LoginGuard, PermissionGuard)
  remove(@Param('id') id: string) {
    return this.bbbService.remove(+id);
  }
}
