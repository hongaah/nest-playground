import { User } from 'src/test-typeorm/user/entities/user.entity';
import { City } from 'src/test-typeorm/city/entities/city.entity';

// TypeOrmModule.forRoot(AppDataSource) 对应的动态模块是全局的，导出了 dataSource、entityManager，所以可以到处注入。
export const AppDataSource = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'hazel',
  database: 'typeorm_test',
  synchronize: true,
  logging: true,
  entities: [User, City],
  poolSize: 10,
  connectorPackage: 'mysql2',
  extra: {
    authPlugin: 'sha256_password',
  },
} as any;
