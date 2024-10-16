const OSS = require('ali-oss');

const client = new OSS({
  region: 'oss-cn-beijing',
  bucket: 'xxx',
  accessKeyId: '',
  accessKeySecret: '',
});

// 使用阿里云 OSS 通过 SDK 来上传文件
async function put() {
  try {
    const result = await client.put('smile.png', './smile.png');
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

async function get() {
  try {
    const result = await client.get('smile.png');
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

put();
get();
