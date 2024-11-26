import { readFileSync } from 'fs';
import { parse, config } from 'dotenv';

// 读取文件转换成对象
export const devEnv = parse(readFileSync('.env'));
console.log(devEnv.aaa);

// 通过 NODE_ENVIRONMENT 环境变量来切换配置文件
console.log('当前环境变量', process.env.NODE_ENVIRONMENT);
config({
  path:
    process.env.NODE_ENVIRONMENT === 'production' ? '.env.prod' : '.env.dev',
});

console.log('aaa', process.env.aaa);
console.log('bbb', process.env.bbb);
