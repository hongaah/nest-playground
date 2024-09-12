# multer

Nest 的文件上传是基于 Express 的中间件 multer 实现。

express 的 multer 包是用来处理 multipart/form-data 格式的文件上传请求。通过 single 方法处理单个字段的单个文件，array 方法处理单个字段的多个文件，fields 方法处理多个字段的文件，any 处理任意数量字段的文件，分别用 req.file 和 req.files 来取解析出的文件。其余非文件字段不会处理，还是通过 req.body 来取。类似文件数量过多等错误，会抛出对应的 error 对象，在错误处理中间件里处理并返回对应的响应就好了。

```sh
# notes\multer\src 启动后端服务
node index.js
# notes\multer\src 启动前端页面
npx http-server
```

## nest & multer 实现文件上传

🌰: src\multer

基本与 express multer 实现一样

```sh
# notes\multer\src 启动前端页面
npx http-server
# 启动 nest 服务，配置 cors: true 运行跨域
```

校验上传的文件做一些限制，比如文件大小、类型: 
- 自定义 pipe
- 自定义 validator
- nest 封装的 pipe 和 validator: ParseFilePipe MaxFileSizeValidator FileTypeValidator
