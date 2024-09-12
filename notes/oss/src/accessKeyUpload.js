const OSS = require('ali-oss');

const client = new OSS({
  region: 'oss-cn-beijing',
  bucket: 'xxx',
  accessKeyId: '',
  accessKeySecret: '',
});

async function put() {
  try {
    const result = await client.put('cat.png', './mao.png');
    console.log('拿到图片线上地址：', result.url);
  } catch (e) {
    console.log(e);
  }
}

put();
