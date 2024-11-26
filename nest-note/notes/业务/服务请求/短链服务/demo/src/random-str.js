const base62 = require('base62/lib/ascii');

function generateRandomStr(len) {
  let str = '';
  for (let i = 0; i < len; i++) {
    const num = Math.floor(Math.random() * 62);
    str += base62.encode(num);
  }
  return str;
}

// 62 的 6 次方，范围有 580 亿
console.log(generateRandomStr(6)); // rpbbm5
