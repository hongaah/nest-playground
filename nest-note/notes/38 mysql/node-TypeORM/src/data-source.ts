import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
  // postgres、oracle、sqllite、mysql
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'hazel',
  database: 'practice',
  // 同步建表，也就是当 database 里没有和 Entity 对应的表的时候，会自动生成建表 sql 语句并执行
  synchronize: true,
  // 打印 sql 语句
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: [],
  poolSize: 10,
  // 指定用 mysql2 包来连接
  connectorPackage: 'mysql2',
  // 添加一个验证的插件，sha256_password，这个是切换密码的加密方式的，新版本 mysql 改成这种密码加密方式
  extra: {
    authPlugin: 'sha256_password',
  },
});
