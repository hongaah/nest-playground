import { Article } from '../article/entities/article.entity';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({ path: 'src/test-typeorm/.env' });

console.log(process.env);

export default new DataSource({
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
  migrations: ['./src/test-typeorm/migrations/**.ts'],
  connectorPackage: 'mysql2',
  extra: {
    authPlugin: 'sha256_password',
  },
});
