import { Transport } from '@nestjs/microservices';

// ClientsModule.register 的参数是一个数组，也就是说你有多个微服务的时候，都依次写在这里就行
export const microServiceConfig = [
  {
    name: 'USER_SERVICE',
    transport: Transport.TCP,
    options: {
      port: 8888,
    },
  },
];
