import { User } from '../entities/user.entity';

export const AppDataSource = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'hazel',
  database: 'google-login',
  synchronize: true,
  logging: true,
  entities: [User],
  poolSize: 10,
  connectorPackage: 'mysql2',
  extra: {
    authPlugin: 'sha256_password',
  },
} as any;
