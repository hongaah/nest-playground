var Minio = require('minio');

var minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  // 通过 docker 起一个 minio 服务后，在 minio 可视化网页创建 accessKey
  accessKey: '',
  secretKey: '',
});

function put() {
  minioClient.fPutObject(
    'aaa',
    'hello.png',
    './smile.png',
    function (err, etag) {
      if (err) return console.log(err);
      console.log('上传成功');
    },
  );
}

function get() {
  minioClient.getObject('aaa', 'hello.png', function (err, dataStream) {
    if (err) return console.log(err);
    dataStream.pipe(fs.createWriteStream('./hello.png'));
  });
}

put();
get();
