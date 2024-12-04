import { Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { EtcdModule } from 'src/my-micro-etcd/etcd/etcd.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // ① 普通模块
    // EtcdModule

    // ② 动态模块
    // EtcdModule.forRoot({
    //   hosts: 'http://localhost:2379',
    // }),

    // ③ 动态异步模块
    // 和 forRoot 的区别就是现在的 options 的 provider 是通过 useFactory 的方式创建的，之前是直接传入。
    EtcdModule.forRootAsync({
      async useFactory(configService: ConfigService) {
        await 111;
        return {
          hosts: configService.get('etcd_hosts'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AaaController],
  providers: [AaaService],
})
export class AaaModule {}
