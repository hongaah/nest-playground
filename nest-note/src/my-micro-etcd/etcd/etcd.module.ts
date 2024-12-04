import { DynamicModule, Module, ModuleMetadata, Type } from '@nestjs/common';
import { EtcdService } from './etcd.service';
import { Etcd3, IOptions } from 'etcd3';

// /** ① 普通模块 */
// @Module({
//   providers: [
//     EtcdService,
//     {
//       provide: 'ETCD_CLIENT',
//       useFactory() {
//         const client = new Etcd3({
//           hosts: 'http://localhost:2379',
//         });
//         return client;
//       },
//     },
//   ],
//   exports: [EtcdService],
// })
// export class EtcdModule {}

/** ② 动态模块 */
// export const ETCD_CLIENT_TOKEN = 'ETCD_CLIENT';
// export const ETCD_CLIENT_OPTIONS_TOKEN = 'ETCD_CLIENT_OPTIONS';
// @Module({})
// export class EtcdModule {
//   static forRoot(options?: IOptions): DynamicModule {
//     return {
//       module: EtcdModule,
//       providers: [
//         EtcdService,
//         {
//           provide: ETCD_CLIENT_TOKEN,
//           useFactory(options: IOptions) {
//             const client = new Etcd3(options);
//             return client;
//           },
//           inject: [ETCD_CLIENT_OPTIONS_TOKEN],
//         },
//         {
//           provide: ETCD_CLIENT_OPTIONS_TOKEN,
//           useValue: options,
//         },
//       ],
//       exports: [EtcdService],
//     };
//   }
// }

/** ③ 动态异步模块 */
export const ETCD_CLIENT_TOKEN = 'ETCD_CLIENT';
export const ETCD_CLIENT_OPTIONS_TOKEN = 'ETCD_CLIENT_OPTIONS';

export interface EtcdModuleAsyncOptions {
  useFactory?: (...args: any[]) => Promise<IOptions> | IOptions;
  inject?: any[];
}

@Module({})
export class EtcdModule {
  static forRootAsync(options: EtcdModuleAsyncOptions): DynamicModule {
    return {
      module: EtcdModule,
      providers: [
        EtcdService,
        {
          provide: ETCD_CLIENT_TOKEN,
          useFactory(options: IOptions) {
            const client = new Etcd3(options);
            return client;
          },
          inject: [ETCD_CLIENT_OPTIONS_TOKEN],
        },
        {
          provide: ETCD_CLIENT_OPTIONS_TOKEN,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ],
      exports: [EtcdService],
    };
  }
}
