import { User } from '../user/entities/user.entity';
import { Article } from '../article/entities/article.entity';

// 登录注册 jwt
export const AppDataSource = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'hazel',
  database: 'article_views',
  synchronize: true,
  logging: false,
  entities: [User, Article],
  poolSize: 10,
  connectorPackage: 'mysql2',
  extra: {
    authPlugin: 'sha256_password',
  },
} as any;
