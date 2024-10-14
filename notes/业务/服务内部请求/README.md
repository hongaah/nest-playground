# nest & @nestjs/axios 服务内部请求

nest 服务里访问三方接口，可以直接用 axios，但如果希望统一配置 axios，然后各个模块都用同一个 axios 实例，可以用 @nestjs/axios 这个包。

因为 HttpModule 把 axios 的方法返回值封装成了 rxjs 的 Observerable，所以需要使用 rxjs 操作符 firstValueFrom
如果想用原生 axios 对象，可以直接调用 this.httpService.axiosRef.xxx，这样返回的就是 promise。

🌰：src\httpConfig\index.ts
🌰：src\my-logger\request-log\request-log.controller.ts

```ts
@Inject(HttpService)
private httpService: HttpService;

async weather(@Param('city') city: string) {
  const { data } = await firstValueFrom(
    this.httpService.get(
      `https://geoapi.qweather.com/v2/city/lookup?location=${cityPinyin}&key=9d67c06d194c43599c7d6d84323eb29b`,
    ),
  );
}

async ipToCity(ip: string) {
  const response = await this.httpService.axiosRef(
    `https://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`,
  );
  return response.data.addr;
}

```

## 字符乱码

接口返回的字符集是 gbk，而我们用的是 utf-8，所以需要转换一下，可以用转换字符集的 iconv-lite 这个包

```ts

import * as iconv from 'iconv-lite';

const response = await this.httpService.axiosRef(
  `https://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`,
  {
    responseType: 'arraybuffer',
    transformResponse: [
      function (data) {
        const str = iconv.decode(data, 'gbk');
        return JSON.parse(str);
      },
    ],
  },
)
```