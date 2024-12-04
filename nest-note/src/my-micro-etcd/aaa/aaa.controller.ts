import { Controller, Inject, Get, Query } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { EtcdService } from 'src/my-micro-etcd/etcd/etcd.service';

@Controller('my-micro-etcd-2/aaa')
export class AaaController {
  constructor(private readonly aaaService: AaaService) {}

  @Inject(EtcdService)
  private etcdService: EtcdService;

  // localhost:3000/my-micro-etcd-2/aaa/save?value=123
  @Get('save')
  async saveConfig(@Query('value') value: string) {
    await this.etcdService.saveConfig('aaa', value);
    return 'done';
  }

  // localhost:3000/my-micro-etcd-2/aaa/get
  @Get('get')
  async getConfig() {
    return await this.etcdService.getConfig('aaa');
  }
}
