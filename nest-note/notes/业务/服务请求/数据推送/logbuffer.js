const { readFileSync } = require('fs');

// 二进制在 node 中是通过 buffer 来表示的
const buffer = readFileSync('./log');

// console.log(buffer);
console.log(buffer.toJSON());
