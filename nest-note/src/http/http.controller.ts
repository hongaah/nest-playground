import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
  Patch,
  Options,
  Head,
  UseInterceptors,
  UploadedFiles,
  Sse,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { HttpService } from './http.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { Observable } from 'rxjs';

/**
 * http 数据传输的方式主要有 5 种
 */
@Controller('/api/http')
export class HttpController {
  constructor(private readonly httpService: HttpService) {}

  // http://localhost:3000/static/stream.html
  // http://localhost:3000/api/http/sse
  // 服务端推送数据流
  @Sse('sse')
  sse() {
    return new Observable((observer) => {
      observer.next({ data: { msg: 'aaa' } });

      setTimeout(() => {
        observer.next({ data: { msg: 'bbb' } });
      }, 2000);

      setTimeout(() => {
        observer.next({ data: { msg: 'ccc' } });
      }, 5000);
    });
  }

  /**
   * url query
   * query 字符串放在了 url 里，通过 url 中 ？后面的用 & 分隔的字符串传递数据
   * @Query 装饰器取 url query 注入到 controller
   */
  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return `received: name=${name},age=${age}`;
  }

  // url param
  // @Param(参数名) 的装饰器取 url param 注入到 controller
  @Get(':id')
  urlParam(@Param('id') id: string) {
    return `received: id=${id}`;
  }

  // form urlencoded
  // application/x-www-form-urlencoded, query 字符串放在了 body 里
  // @Body 装饰器，Nest 会解析请求体，然后注入到 dto
  // dto 是 data transfer object，就是用于封装传输的数据的对象
  @Post()
  body(@Body() createPersonDto: CreatePersonDto) {
    return `received: ${JSON.stringify(createPersonDto)}`;
  }

  // json
  // application/json query 字符串放在了 body 里
  // form urlencoded 和 json 都是从 body 取值，Nest 内部会根据 content type 做区分，使用不同的解析方式，后端代码同样使用 @Body 来接收，不需要做啥变动
  // @Post()
  // body(@Body() createPersonDto: CreatePersonDto) {
  //   return `received: ${JSON.stringify(createPersonDto)}`;
  // }

  // form data
  // json 和 form urlencoded 都不适合传递文件，想传输文件要用 form data
  // form data 是用 -------- 作为 boundary 分隔传输的内容的
  // Nest 解析 form data 使用 FilesInterceptor 的拦截器，用 @UseInterceptors 装饰器启用，然后通过 @UploadedFiles 来取。非文件的内容，同样是通过 @Body 来取。
  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  body2(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return `received: ${JSON.stringify(createPersonDto)}`;
  }

  @Put()
  testPut() {
    return 'test put';
  }

  @Delete()
  testDelete() {
    return 'I am Delete';
  }

  @Patch()
  testPatch() {
    return 'I am Patch';
  }

  @Options()
  testOptions() {
    return 'I am Options';
  }

  @Head()
  testHead() {
    return 'I am Head';
  }
}
