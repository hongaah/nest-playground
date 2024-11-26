import {
  Body,
  Post,
  DefaultValuePipe,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseEnumPipe,
  ParseFloatPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Ooo } from './dto/ooo.dto';
import { Ppp } from './dto/ppp.dto';
import { MyValidationPipe } from './my-validation.pipe';

enum Ggg {
  AAA = '111',
  BBB = '222',
  CCC = '333',
}

@Controller('pipe')
export class PipeController {
  // 直接指定 MyValidationPipe，不使用 new，就可以让 Nest 去创建对象放到 ioc 容器里
  @Post('ooo')
  ooo(@Body(MyValidationPipe) obj: Ooo) {
    console.log(obj);
    return 'ok';
  }

  @Post('ppp')
  ppp(@Body() post: Ppp) {
    console.log(post);
    return 'ok';
  }

  @Get()
  getHello(@Query('aa', ParseIntPipe) aa: number): number {
    return aa + 1;
  }

  @Get('aa')
  aa(
    @Query(
      'aa',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    aa: number,
  ): number {
    return aa + 1;
  }

  @Get('bb')
  bb(
    @Query(
      'aa',
      new ParseIntPipe({
        exceptionFactory: (msg) => {
          console.log(msg);
          throw new HttpException('xxx ' + msg, HttpStatus.NOT_IMPLEMENTED);
        },
      }),
    )
    aa: number,
  ): number {
    return aa + 1;
  }

  @Get('cc')
  cc(@Query('cc', ParseFloatPipe) cc: number) {
    return cc + 1;
  }

  @Get('dd')
  dd(@Query('dd', ParseBoolPipe) dd: boolean) {
    return typeof dd;
  }

  @Get('ee')
  ee(
    @Query(
      'ee',
      new ParseArrayPipe({
        items: Number,
      }),
    )
    ee: Array<number>,
  ) {
    return ee.reduce((total, item) => total + item, 0);
  }

  @Get('ff')
  ff(
    @Query(
      'ff',
      new ParseArrayPipe({
        separator: '..',
        optional: true,
      }),
    )
    ff: Array<string>,
  ) {
    return ff;
  }

  // http://localhost:3000/pipe/gg/111
  @Get('gg/:enum')
  gg(@Param('enum', new ParseEnumPipe(Ggg)) e: Ggg) {
    return e;
  }

  @Get('hh/:uuid')
  hh(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return uuid;
  }

  @Get('kkk')
  kkk(@Query('kkk', new DefaultValuePipe('aaa')) kkk: string) {
    return kkk;
  }
}
