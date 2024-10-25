# 国际化

支持多种语言环境的用户访问，前端要做界面的国际化，后端也同样要做返回的信息的国际化。

## 实现

nest 里我们用 nestjs-i18n 这个包，在 AppModule 里引入 I18nModule，指定资源包的路径，resolver（取 lang 配置的方式）。然后就可以注入 I18nSerive，用它的 t 方法来取资源包中的文案了。dto 的国际化需要全局启用 I18nValidationPipe 和 I18nValidationExceptionFilter，然后把 message 换成资源包的 key 就好了。文案支持占位符，可以在资源包里写 {xxx} 然后用的时候传入 xxx 的值。

## 配置

国际包数据文件: src\i18n
例子：src\test-i18n
全局配置：src\test-i18n\i18nConfig.ts
切换语言包的方式：请求参数、cookie、header、url 参数、localStorage、sessionStorage、cookie、query 参数、localStorage、sessionStorage、request body、request header、request url

用 I18nService 做的翻译，对于不在 IoC 容器里的类，需要借助 nestjs-i18n 提供的 I18nValidationPipe 来替换 ValidationPipe。ValidationPipe 的全局配置需要注释掉，不然不生效。可以局部启用也可以全局启用。
全局启用的例子：

```ts :main.ts
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

app.useGlobalPipes(new I18nValidationPipe());
app.useGlobalFilters(new I18nValidationExceptionFilter({
  detailedErrors: false
}));
```

```ts :nest-cli.json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "assets": [
      {
        "include": "i18n/**/*", "watchAssets": true
      }
    ]
  }
}

```
