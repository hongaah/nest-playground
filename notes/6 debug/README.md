# 调试

## 浏览器调试 node

node 调试模式，起了一个 ws 服务。然后我们用调试客户端连上它，比如用 Chrome DevTools。打开 <chrome://inspect/>，可以看到可以调试的目标，如果没有，就配置下 network target，加上 localhost:9229，点击 inspect 就可以看到调试界面了

```sh
node ./index.js
node --inspect index.js // 调试模式运行，起了一个 ws 服务
node --inspect-brk index.js // 首行断住
```

## VSCode 调试 node

```json :.vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Program",
      "program": "${workspaceFolder}/notes/3 debug/index.js",
      "request": "launch",
      "stopOnEntry": true, // 首行断住
      "skipFiles": [
        "<node_internals>/**"
      ],
      "type": "node"
    }
  ]
}
```

## VSCode Debugger nest

nest start --debug // 原理就是 node --inspect，断点需要手动加 debugger

```json :.vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach",
      "port": 9229,
      "request": "attach",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "type": "pwa-node"
    }
  ]
}
```

步骤：

1. 配置 launch.json
2. 代码打断点
3. 运行项目 nest start --debug
4. VSCode run Attach
5. 接口调用

### vscode 断点状态

调试时， 断点有两种可能的视觉状态：

- 红色实心圆圈，调试器在目标进程中成功设置了断点。
- 空心 (白色填充) 圆圈，尝试设置断点时，断点被禁用或出现警告。
提示：未绑定断点，无法设置某些断点。如果遇到问题，可以对启动配置进行故障排除。

空心问题排查：
1. 源码需要支持 sourcemap，检查编译文件的配置，比如 nest-cli.json 的 webpack: false

## VSCode Debugger nest 简易版

1. 创建 npm scripts 的调试配置

```json :.vscode/launch.json
{
  "type": "node",
  "request": "launch",
  "name": "debug nest",
  "runtimeExecutable": "npm",
  "args": [
    "run",
    "start:dev",
  ],
  "skipFiles": [
    "<node_internals>/**"
  ],
  "console": "integratedTerminal", // 用 vscode 的内置终端
}
```

2. 打断点，点击调试模式启动
3. 接口调用
