import { User } from '../user/entities/user.entity';
import { Permission } from '../user/entities/permission.entity';

// 权限控制 ACL
export const AppDataSource = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'hazel',
  database: 'acl_test',
  synchronize: true,
  logging: false,
  entities: [User, Permission],
  poolSize: 10,
  connectorPackage: 'mysql2',
  extra: {
    authPlugin: 'sha256_password',
  },
} as any;
