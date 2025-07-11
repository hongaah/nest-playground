import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Article } from './entity/Article';
import { Tag } from './entity/Tag';

// DataSource 会根据你传入的连接配置、驱动包，来创建数据库连接
export const AppDataSource = new DataSource({
  // type 是数据库的类型，因为 TypeORM 不只支持 MySQL 还支持 postgres、oracle、sqllite 等数据库。
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'hazel',
  database: 'typeorm_test',
  // synchronize 是根据同步建表，也就是当 database 里没有和 Entity 对应的表的时候，会自动生成建表 sql 语句并执行。
  synchronize: true,
  // 打印生成的 sql 语句。
  logging: true,
  // entities 是指定有哪些和数据库的表对应的 Entity。
  entities: [Article, Tag],
  // migrations 是修改表结构之类的 sql
  migrations: [],
  // subscribers 是一些 Entity 生命周期的订阅者，比如 insert、update、remove 前后，可以加入一些逻辑
  subscribers: [],
  // poolSize 是指定数据库连接池中连接的最大数量。
  poolSize: 10,
  // connectorPackage 是指定用什么驱动包。
  connectorPackage: 'mysql2',
  // extra 是额外发送给驱动包的一些选项。
  extra: {
    authPlugin: 'sha256_password',
  },
});
