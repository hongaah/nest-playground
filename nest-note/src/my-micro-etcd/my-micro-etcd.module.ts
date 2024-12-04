import { Module } from '@nestjs/common';
import { MyMicroEtcdService } from './my-micro-etcd.service';
import { MyMicroEtcdController } from './my-micro-etcd.controller';
import { Etcd3 } from 'etcd3';
import { AaaModule } from './aaa/aaa.module';
import { EtcdModule } from 'src/my-micro-etcd/etcd/etcd.module';

@Module({
  controllers: [MyMicroEtcdController],
  providers: [
    MyMicroEtcdService,
    {
      provide: 'ETCD_CLIENT',
      useFactory() {
        const client = new Etcd3({
          hosts: 'http://localhost:2379',
          // auth: {
          //   username: 'root',
          //   password: 'hazel',
          // },
        });
        return client;
      },
    },
  ],
  imports: [EtcdModule, AaaModule],
})
export class MyMicroEtcdModule {}
