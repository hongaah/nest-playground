# minio

文件上传一般我们都是用 OSS 服务来存储，比如阿里云的 OSS。但是 OSS 是收费的，而且有些敏感数据不能传到云上，需要私有部署，这种就可以自己搭一个 OSS 服务。

OSS 服务都是类似的，因为它们都是遵循 AWS（亚马逊）的 Simple Storage Service（S3）规范的，简称 S3 规范。所以使用起来都差不多。

## 搭建 oss 服务

### docker

```sh
docker pull bitnami/minio
docker run --name minio-666 -p 9000:9001 -v /Users/hazel/minio:/bitnami/minio/data -e MINIO_ROOT_USER=username -e MINIO_ROOT_PASSWORD=password -d bitnami/minio
```

登录 minio 创建 bucket：
浏览器访问：http://127.0.0.1:9000/login -> /browser -> create bucket -> upload file

设置文件访问权限，避免文件链接过长，添加一个 / 的匿名的访问规则：
buckets - anonymous - add access role -> anonymous access: {prefix: /, access: readonly} -> save

### sdk

[minio](https://min.io/docs/minio/linux/developers/javascript/minio-javascript.html)

🌰: notes\业务\文件\minio\minio-test\src\minio.js

node minio.js

## minio 上传

### 客户端直传 & 生成临时的签名

有种方式是前端把文件上传到后端，后端再上传到 oss 服务，但这样没必要，传两次文件，浪费流量。一般都是前端直传 OSS 服务，然后把文件 url 给应用服务器。只要在服务端做预签名，前端就可以不用 accessKey 实现文件上传，确保了 accessKey 的安全。

1. 服务端生成临时的签名。🌰: src\minio
2. 前端通过签名上传文件到 minio 服务器。🌰：public\minio.html
