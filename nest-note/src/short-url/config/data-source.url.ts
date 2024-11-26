import { UniqueCode } from '../entities/UniqueCode';
import { ShortLongMap } from '../entities/ShortLongMap';

export const AppDataSource = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'hazel',
  database: 'short-url',
  synchronize: true,
  logging: false,
  entities: [UniqueCode, ShortLongMap],
  poolSize: 10,
  connectorPackage: 'mysql2',
  extra: {
    authPlugin: 'sha256_password',
  },
} as any;
