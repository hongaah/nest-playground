# Nest 实现 Server Sent Event 数据推送

服务器到浏览器的消息推送：
- web socket，如果连接断了需要手动重连。
- Server Sent Event（SSE）单向推送信息

## Server Sent Event（SSE）

Server Sent Event（SSE）服务端单向推数据流，是HTTP 请求的一种，HTTP 返回的 Content-Type 是 text/event-stream，代表这是一个流，可以多次返回内容。TCP 连接会长期保持，如果连接断了浏览器会自动重连。🌰：src\http\stream
前端通过 EventSource 的 onmessage 来接收消息。🌰：public\stream.html
传输内容：传输的是 json 格式的内容，可以用来传输文本或者二进制内容
兼容性：很好，除了 ie 外都可以放心的用
应用：站内信、CICD 构建日志实时打印、Chat GPT 信息返回等

## 应用

### 日志的实时推送

在 log 文件中不断写入， 执行以下命令后会在控制台实时输出：

```sh
tail -f ./log # linux
powershell Get-Content -Path ./log -Wait -Tail 10 # windows
node autolog.js
node ./logbuffer.js
```

### 爬虫大数据打印

🌰：src\ppt-generate
