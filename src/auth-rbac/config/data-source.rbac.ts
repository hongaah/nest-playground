import { User } from '../user/entities/user.entity';
import { Permission } from '../user/entities/permission.entity';
import { Role } from '../user/entities/role.entity';

// 权限控制 RBAC
export const AppDataSource = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'hazel',
  database: 'rbac_test',
  synchronize: true,
  logging: false,
  entities: [User, Permission, Role],
  poolSize: 10,
  connectorPackage: 'mysql2',
  extra: {
    authPlugin: 'sha256_password',
  },
} as any;
