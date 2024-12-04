import { NacosConfigClient } from 'nacos';

const client = new NacosConfigClient({
  serverAddr: 'localhost:8848',
});

// 新增
const content = await client.publishSingle(
  'config',
  'DEFAULT_GROUP',
  '{"host":"127.0.0.1","port":8848}',
);

// 删除
// await client.remove('config', 'DEFAULT_GROUP')

// 查询
const config = await client.getConfig('config', 'DEFAULT_GROUP');
console.log(config);

// 监听
client.subscribe({ dataId: 'config', group: 'DEFAULT_GROUP' }, (content) => {
  console.log(content);
});

// publishSingle 增加配置、然后 3s 后再 publishSingle 修改下这个配置。可以看到 subscribe 监听到了配置变化，打印了最新配置。
// setTimeout(() => {
//   client.publishSingle(
//     'config',
//     'DEFAULT_GROUP',
//     '{"host":"127.0.0.1","port":5000}',
//   );
// }, 3000);
