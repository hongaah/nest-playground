import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Put,
  Options,
  Head,
  SetMetadata,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ParseIntPipe,
  Query,
  UseFilters,
  HttpException,
  HttpStatus,
  ParseBoolPipe,
  Headers,
  Ip,
  Session,
} from '@nestjs/common';
import { DecoratorService } from './decorator.service';
import { CreateDecoratorDto } from './dto/create-decorator.dto';
import { UpdateDecoratorDto } from './dto/update-decorator.dto';
import { LoginGuard, TimeInterceptor } from 'src/aop/concept';
import { CommonFilter } from './common.filter';
import { AuthGuard } from './auth.guard';

@Controller('decorator')
@SetMetadata('roles', ['user'])
export class DecoratorController {
  constructor(private readonly decoratorService: DecoratorService) {}

  @Inject('Person')
  private readonly person: Record<string, any>;

  @Get('api/person')
  getPerson() {
    return this.person;
  }

  @Post('api')
  create(@Body() createDecoratorDto: CreateDecoratorDto) {
    return this.decoratorService.create(createDecoratorDto);
  }

  @Get('api')
  findAll() {
    return this.decoratorService.findAll();
  }

  @Get('api:id')
  findOne(@Param('id') id: string) {
    return this.decoratorService.findOne(+id);
  }

  @Patch('api:id')
  update(
    @Param('id') id: string,
    @Body() updateDecoratorDto: UpdateDecoratorDto,
  ) {
    return this.decoratorService.update(+id, updateDecoratorDto);
  }

  @Delete('api:id')
  remove(@Param('id') id: string) {
    return this.decoratorService.remove(+id);
  }

  @Put()
  testPut() {
    return 'test put';
  }

  @Options()
  testOptions() {
    return 'I am Options';
  }

  @Head()
  testHead() {
    return 'I am Head';
  }

  @Get('test-aop')
  @UseFilters(CommonFilter)
  @UseGuards(LoginGuard)
  @UseInterceptors(TimeInterceptor)
  @UsePipes(ParseIntPipe)
  testAop(@Query('id') id: number) {
    console.log(id);
    if (id === 1) {
      throw new HttpException('test aop', HttpStatus.BAD_REQUEST);
    } else {
      return `I am testAop No.${id}`;
    }
  }

  // /decorator/test-pipe/111?isVip=false @Param 是取路径中的参数
  @Get('test-pipe/:orderCode')
  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['admin'])
  testPipe(
    @Param('orderCode') orderCode: number,
    @Query('isVip', ParseBoolPipe) isVip: boolean,
  ) {
    return `I am testAop2 orderCode: ${orderCode} isVip: ${isVip}`;
  }

  @Get('test-header')
  testHeader(
    @Headers('Accept') accept: string,
    @Headers() headers: Record<string, any>,
  ) {
    console.log('accept', accept);
    console.log('headers', headers);
    return 'I am testHeader';
  }

  // 通过 @Ip 拿到请求的 ip
  @Get('test-ip')
  testIp(@Ip() ip: string) {
    console.log('ip', ip); // ::1
    return ip;
  }

  // 通过 @Session 拿到 session 对象
  @Get('test-session')
  testSession(@Session() session: Record<string, any>) {
    console.log('session', session);
    return `I am session ${session}`;
  }
}
