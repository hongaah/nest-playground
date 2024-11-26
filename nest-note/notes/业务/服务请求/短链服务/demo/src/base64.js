const data = '123456';
const buff = Buffer.from(data);
const base64data = buff.toString('base64');

console.log(base64data); // MTIzNDU2
