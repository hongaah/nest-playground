import { Job } from '../entities/Job';

// 爬取 boss jd
export const AppDataSource = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'hazel',
  database: 'boss-spider',
  synchronize: true,
  logging: false,
  entities: [Job],
  poolSize: 10,
  connectorPackage: 'mysql2',
  extra: {
    authPlugin: 'sha256_password',
  },
} as any;
