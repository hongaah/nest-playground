const crypto = require('crypto');

function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

console.log(md5('111222')); // 00b7691d86d96aebd21dd9e138f90840
