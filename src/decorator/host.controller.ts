import {
  Controller,
  Get,
  Header,
  HostParam,
  HttpCode,
  Next,
  Redirect,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

// controller 除了可以指定某些 path 生效外，还可以指定 host
// host 满足 xx.0.0.1 的时候才会路由到这个 controller。host 里的参数就可以通过 @HostParam 取出来
// 127.0.0.1:3000/testHost/getHostParam host: ':host.0.0.1',
@Controller({ host: ':host.0.0.1', path: 'testHost' })
export class HostController {
  @Get('getHostParam')
  aaa(@HostParam('host') host) {
    return 'hello ' + host;
  }

  // 直接注入 request 对象
  // @Req 或者 @Request 装饰器是同一个
  @Get('getRequest')
  bbb(@Req() req: Request) {
    console.log(req.hostname);
    console.log(req.url);
    return 'I am getRequest';
  }

  // response 对象
  // @Res 或者 @Response 装饰器是同一个
  // 注入 response 对象之后，服务器会一直没有响应，因为这时候 Nest 就不会再把 handler 返回值作为响应内容了，可以自己返回响应
  @Get('getResponse1')
  ccc(@Res() res: Response) {
    res.end('send diy');
  }

  // response 对象
  // Nest 这么设计是为了避免你自己返回的响应和 Nest 返回的响应的冲突。如果你不会自己返回响应，可以通过 passthrough 参数告诉 Nest
  @Get('getResponse2')
  ddd(@Res({ passthrough: true }) res) {
    return 'I am getResponse2';
  }

  // @Next
  // 当你有两个 handler 来处理同一个路由的时候，可以在第一个 handler 里注入 next，调用它来把请求转发到第二个 handler
  @Get('getTestNext')
  eee(@Next() next: NextFunction) {
    console.log('hanlder1');
    next();
    return '111';
  }

  @Get('getTestNext')
  fff() {
    console.log('hanlder2');
    return '222';
  }

  // @HttpCode 修改默认返回 200 状态码的 handler
  @Get('getHttpCode')
  @HttpCode(222)
  iii() {
    return 'hello';
  }

  // @Header 装饰器添加或修改 response header
  @Get('changeResHeader')
  @Header('aaa', 'bbb')
  jjj() {
    return 'hello';
  }

  // @Redirect 装饰器指定路由重定向的 url
  @Get('goRedirect1')
  @Redirect('http://juejin.cn')
  kkk() {}

  // @Redirect 装饰器 在返回值的地方设置 url
  @Get('goRedirect2')
  @Redirect()
  async lll() {
    return {
      url: 'https://www.baidu.com',
      statusCode: 302,
    };
  }

  // @Render 给返回的响应内容指定渲染引擎
  // 需要先安装模版引擎的包 hbs，在 main.ts 先指定静态资源的路径和模版的路径，并指定模版引擎为 handlerbars。
  @Get('getRender/user')
  @Render('decorator/user')
  mmm() {
    return { name: 'person', age: 20 };
  }
}
