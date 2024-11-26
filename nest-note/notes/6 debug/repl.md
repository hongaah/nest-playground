# repl

repl(read-eval-paint-loop) 是一个交互式命令行工具，可以执行 nodejs 代码，并且可以保存变量，方便调试。

## node 的 repl 模式

```sh
node
os.homedir()
os.userInfo()
```

## nest 的 repl 模式

repl 模式下可以直接调用 controller 或者 provider 的方法，但是它们并不会触发 pipe、interceptor 等，只是传参测试函数。

可以使用 debug() 拿到 module、controller、provider 的信息，methods() 拿到方法，然后 get() 或者 $() 拿到 controller、provider 然后调用。

repl 模式对于测试 service 或者 contoller 的功能还是很有用的。

```ts :repl.ts
import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // await repl(AppModule);

  const replServer = await repl(AppModule);
  // 配置 history 文件，用处是记录历史命令，避免服务重启后无法通过上下箭头使用历史命令
  replServer.setupHistory(".nestjs_repl_history", (err) => {
    if (err) {
      console.error(err);
    }
  });
}
bootstrap();
```

```sh
# 前面带了个 -- 是指后面的参数不是传给 pnpm start:dev 的，要原封不动保留。
# --entryFile 是指定入口文件是 repl.ts
pnpm start:dev -- --entryFile repl

# 或者直接执行 nest start
nest start --watch --entryFile repl

# 调试 查看全部的 module
debug()
# 调试 查看某个 module 下的 cotrollers、providers
debug(HttpModule)
# 查看某个 controller 或者 provider 的方法
methods(HttpController)

# get() 或者 $() 可以拿到某个 controller 或者 provider 调用它的方法
get('HttpController')
$('HttpController')
$('HttpController').getHello()
# 不会触发 pipe、interceptor
get(SwaggerController).ccc()
# 如果方法里有校验逻辑会报错
get(EmailLoginController).login()
get(EmailLoginController).login({code: 11, email: 111})
# 可以测试 service 的方法
await get(UserService).login({username: 'admin', password: 'admin'})
```
