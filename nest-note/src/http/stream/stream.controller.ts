import { Controller, Sse } from '@nestjs/common';
import { StreamService } from './stream.service';
import { Observable } from 'rxjs';
import { readFileSync } from 'fs';
import { exec } from 'child_process';

@Controller('api/http/stream')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  // http://localhost:3000/static/stream.html
  // http://localhost:3000/api/http/stream/sse1
  // 服务端推送数据流
  @Sse('sse1')
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

  // 监听文件变化，并实时推送文件内容，输出文本
  // http://localhost:3000/api/http/stream/sse2
  @Sse('sse2')
  stream2() {
    const childProcess = exec(
      'powershell Get-Content -Path ./src/http/stream/log -Wait -Tail 10',
    );

    return new Observable((observer) => {
      childProcess.stdout.on('data', (msg) => {
        observer.next({ data: { msg: msg.toString() } });
      });
    });
  }

  // 读文件，输出二进制数据
  @Sse('sse3')
  stream3() {
    return new Observable((observer) => {
      const json = readFileSync('./package.json').toJSON();
      observer.next({ data: { msg: json } });
    });
  }
}
