import { User } from '../user/entities/user.entity';

// 登录注册 jwt
export const AppDataSource = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'hazel',
  database: 'login_test',
  synchronize: true,
  logging: true,
  entities: [User],
  poolSize: 10,
  connectorPackage: 'mysql2',
  extra: {
    authPlugin: 'sha256_password',
  },
} as any;
