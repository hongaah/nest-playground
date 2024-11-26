const OSS = require('ali-oss');

async function main() {
  const config = {
    region: 'oss-cn-beijing',
    bucket: 'xxx',
    accessKeyId: '',
    accessKeySecret: '',
  };

  const client = new OSS(config);

  const date = new Date();

  date.setDate(date.getDate() + 1);

  // 生成临时签名
  const res = client.calculatePostSignature({
    expiration: date.toISOString(),
    conditions: [
      ['content-length-range', 0, 1048576000], //设置上传文件的大小限制。
    ],
  });

  console.log(res);

  const location = await client.getBucketLocation();

  const host = `http://${config.bucket}.${location.location}.aliyuncs.com`;

  console.log(host);
}

main();
