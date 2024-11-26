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
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { LoginGuard } from '../config/login.guard';
import { LoginGuard as LoginGuardSingleToken } from '../config/login.singleToken.guard';
import { PermissionGuard } from '../config/permission.guard';
import { RequireLogin } from '../config/custom-decorator';

@Controller('auth-rbac2/aaa')
@RequireLogin()
export class AaaController {
  constructor(private readonly aaaService: AaaService) {}

  @Post()
  @UseGuards(LoginGuard, PermissionGuard)
  create(@Body() createAaaDto: CreateAaaDto) {
    return this.aaaService.create(createAaaDto);
  }

  @Get()
  @UseGuards(LoginGuard, PermissionGuard)
  findAll() {
    return this.aaaService.findAll();
  }

  @Get('singleToken')
  @UseGuards(LoginGuardSingleToken, PermissionGuard)
  singleToken() {
    return this.aaaService.findAll();
  }

  @Get(':id')
  @UseGuards(LoginGuard, PermissionGuard)
  findOne(@Param('id') id: string) {
    return this.aaaService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(LoginGuard, PermissionGuard)
  update(@Param('id') id: string, @Body() updateAaaDto: UpdateAaaDto) {
    return this.aaaService.update(+id, updateAaaDto);
  }

  @Delete(':id')
  @UseGuards(LoginGuard, PermissionGuard)
  remove(@Param('id') id: string) {
    return this.aaaService.remove(+id);
  }
}
