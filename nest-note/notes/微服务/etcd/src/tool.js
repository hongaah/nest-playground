import { Etcd3 } from 'etcd3';

const client = new Etcd3({
  hosts: 'http://localhost:2379',
  // auth: {
  //   username: 'root',
  //   password: 'hazel',
  // },
});

// 保存配置
async function saveConfig(key, value) {
  await client.put(key).value(value);
}

// 读取配置
async function getConfig(key) {
  return await client.get(key).string();
}

// 删除配置
async function deleteConfig(key) {
  await client.delete().key(key);
}

// 服务注册
// 注册的时候我们按照 /services/服务名/实例id 的格式来指定 key，也就是一个微服务可以有多个实例
async function registerService(serviceName, instanceId, metadata) {
  const key = `/services/${serviceName}/${instanceId}`;

  // 创建一个 10 秒的租约，过期会自动删除
  const lease = client.lease(10);
  await lease.put(key).value(JSON.stringify(metadata));

  // 租约过期会触发 lost 事件，在过期后自动续租。当不再续租的时候，就代表这个服务挂掉了
  lease.on('lost', async () => {
    console.log('租约过期，重新注册...');
    await registerService(serviceName, instanceId, metadata);
  });
}

// 服务发现
// 服务发现就是查询 /services/服务名 下的所有实例，返回它的信息
async function discoverService(serviceName) {
  const instances = await client
    .getAll()
    .prefix(`/services/${serviceName}`)
    .strings();

  return Object.entries(instances).map(([key, value]) => JSON.parse(value));
}

// 监听服务变更
async function watchService(serviceName, callback) {
  const watcher = await client
    .watch()
    .prefix(`/services/${serviceName}`)
    .create();
  watcher
    .on('put', async (event) => {
      console.log('新的服务节点添加:', event.key.toString());
      callback(await discoverService(serviceName));
    })
    .on('delete', async (event) => {
      console.log('服务节点删除:', event.key.toString());
      callback(await discoverService(serviceName));
    });
}

// (async function main() {
// 保存并读取配置
//     await saveConfig('config-key', 'config-value');
//     const configValue = await getConfig('config-key');
//     console.log('Config value:', configValue);
// })();

(async function main() {
  // 服务注册获取服务的所有节点信息
  const serviceName = 'my_service';

  await registerService(serviceName, 'instance_1', {
    host: 'localhost',
    port: 3000,
  });
  await registerService(serviceName, 'instance_2', {
    host: 'localhost',
    port: 3002,
  });

  const instances = await discoverService(serviceName);
  console.log('所有服务节点:', instances);

  // 服务发现 监听服务变更
  watchService(serviceName, (updatedInstances) => {
    console.log('服务节点有变动:', updatedInstances);
  });
})();
