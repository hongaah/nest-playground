import { Etcd3 } from 'etcd3';

const client = new Etcd3({
  hosts: 'http://localhost:2379',
  // auth: {
  //   username: 'root',
  //   password: 'hazel',
  // },
});

(async () => {
  const services = await client.get('/services/a').string();
  console.log('service A:', services);

  const allServices = await client.getAll().prefix('/services').keys();
  console.log('all services:', allServices);

  // 创建某个 key 的监听器，比如监听 put 和 delete 事件
  const watcher = await client.watch().key('/services/a').create();
  watcher.on('put', (req) => {
    console.log('put', req.value.toString());
  });
  watcher.on('delete', (req) => {
    console.log('delete');
  });
})();
