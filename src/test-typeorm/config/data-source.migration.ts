import { Article } from '../article/entities/article.entity';
import { config } from 'dotenv';

config({ path: 'src/test-typeorm/.env' });

console.log(process.env);

export const AppDataSource = {
  type: 'mysql',
  host: `${process.env.mysql_server_host}`,
  port: +`${process.env.mysql_server_port}`,
  username: `${process.env.mysql_server_username}`,
  password: `${process.env.mysql_server_password}`,
  database: `${process.env.mysql_server_database}`,
  synchronize: false,
  logging: true,
  entities: [Article],
  poolSize: 10,
  connectorPackage: 'mysql2',
  extra: {
    authPlugin: 'sha256_password',
  },
} as any;
