# 调试 Nest 源码

1. 下载 Nest 源码

```sh
# 加个 --depth=1 是下载单 commit，--single-branch 是下载单个分支，这样速度会快很多
git clone --depth=1 --single-branch https://github.com/nestjs/nest.git

npm i
npm run build
```

2. 构建出 Nest 的 sourcemap bandle

生成 sourcemap 需要改下 nest 源码里 tsc 编译配置，设置 sourceMap 为 true 也就是生成 sourcemap，但默认的 sourcemap 里不包含内联的源码，也就是 sourcesContent 部分，需要设置 inlineSources 来包含。
```json :packages/tsconfig.build.json
{
  ...
  "sourceMap": true,
  "inlineSourceMap": true,
}
```

3. 将 Nest 源码的构建出的产物（node_modules/@nestjs），全部复制替换到要调试的测试 nest 项目里的 node_modules/@nestjs。

4. 配置好调试配置，打个断点，运行下就可以调试了。

vscode 里创建 npm scripts 的调试配置，就可以调试 npm run start:dev 的服务。同时还要设置 resolveSourcemapLocations 去掉排除 node_modules 的配置。然后再调试，就可以直接调试 Nest 的 ts 源码了。

```json :launch.json
{
  "name": "调试 nest 源码",
  "request": "launch",
  "runtimeArgs": [
    "run-script",
    "start:dev"
  ],
  "runtimeExecutable": "npm",
  "console": "integratedTerminal",
  "cwd": "${workspaceFolder}/sample/01-cats-app/",
  "resolveSourceMapLocations": [
    "${workspaceFolder}/**",
    // "!**/node_modules/**"
  ],
  "skipFiles": [
    "<node_internals>/**"
  ],
  "type": "node"
}
```

比如调试了下 AOP 部分的源码，以后对哪部分的实现原理感兴趣，也可以自己调试源码了。
