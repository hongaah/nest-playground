# OSS 上传

文件上传是常见需求，一般我们不会把文件直接上传到应用服务器，因为单台服务器存储空间是有限的，不好扩展。

我们会用单独的 OSS （Object Storage Service）对象存储服务来上传下载文件。它是支持分布式扩展的，不用担心存储容量问题，而且也好管理。比如一般会买阿里云的 OSS 服务。

## oss 文件存储组织方式

- 对象存储：key-value 存储，分布式的方式实现的，存储容量无限。
- 文件存储：有目录层次结构，可以上传下载文件，存储容量有限。
- 块存储：提供整块磁盘，需要自己格式化，存储容量有限。

我们本地文件存储是目录-文件的组织方式，但 OSS 绝大多数情况都是用对象存储。

oss：

- 创建 bucket，设置公用读或私有的方式
- 开启 CDN，用网站域名访问文件，最终回源到 OSS 服务
- 上传文件：oss 控制台上传、代码上传

## 分片上传

https://help.aliyun.com/zh/oss/user-guide/multipart-upload?spm=a2c4g.11186623.0.0.736432efe7m2a2#aa91ba94b5uot

## 代码上传

不管在哪里上传，都需要 acessKeyId 和 acessKeySecret。

### 客户端直传 & node 里用 ali-oss 包来上传 & 直接使用 acessKeyId 和 acessKeySecret。

本来我们身份认证都是通过用户名密码，但这样不够安全，所以我们创建了 accessKey(accessKey 管理 - 创建 accessKey) 用来代表身份，用它来做身份认证，就算泄漏了，也可以直接禁用这个 key。

🌰1：notes\oss\src\accessKeyUpload.js

### 客户端直传 & node 里用 ali-oss 包来上传 & 创建一个子用户再创建 accessKey

直接用这个 accessKey 它是有所有权限的。我们先创建个 RAM 子用户，再分配给他某些权限，这样就算泄漏了，能做的事情也会更少，更安全。

- 创建用户 - openAPI 调用访问（启用 accessKeyId、acessKeySecret）
- 访问控制 - 新增授权（把 OSS 的管理和读取权限给这个子用户）

调用方法同 🌰1：notes\oss\src\accessKeyUpload.js

### 客户端直传 & 生成临时的签名

服务端用 RAM 子用户的 accessKey 来生成临时签名，然后返回给客户端，客户端用这个来直传文件到 OSS。因为临时的签名过期时间很短，我们设置的是一天，所以暴露的风险也不大。

🌰：
node tempSignature.js
npx http-server .

visit tempSignature.html，需要控制台开启跨域

[服务端签名客户端直传 Node.js 示例](https://help.aliyun.com/zh/oss/use-cases/node-js?spm=a2c4g.11186623.0.0.41e96075bvL9Io)

### 服务端上传

前端传给后端，后端上传 oss
