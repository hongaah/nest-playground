import { Controller, Get, Inject, Query } from '@nestjs/common';
import { MyMicroEtcdService } from './my-micro-etcd.service';
import { Etcd3 } from 'etcd3';

@Controller('my-micro-etcd')
export class MyMicroEtcdController {
  constructor(private readonly myMicroEtcdService: MyMicroEtcdService) {}

  @Get()
  getHello(): string {
    return 'I am my-micro-etcd';
  }

  @Inject('ETCD_CLIENT')
  private etcdClient: Etcd3;

  // http://localhost:3000/my-micro-etcd/put?value=hello
  @Get('put')
  async put(@Query('value') value: string) {
    await this.etcdClient.put('aaa').value(value);
    return 'done';
  }

  // http://localhost:3000/my-micro-etcd/get
  @Get('get')
  async get() {
    return await this.etcdClient.get('aaa').string();
  }

  // http://localhost:3000/my-micro-etcd/del
  @Get('del')
  async del() {
    await this.etcdClient.delete().key('aaa');
    return 'done';
  }
}
