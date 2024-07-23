import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: "localhost",
    port: 3306,
    username: "root",
    password: "hazel",
    database: "practice",
    synchronize: true,
    // 打印 sql 语句
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
    // 指定用 mysql2 包来连接
    connectorPackage: 'mysql2',
    // 添加一个验证的插件，sha256_password，这个是切换密码的加密方式的，新版本 mysql 改成这种密码加密方式
    extra: {
      authPlugin: 'sha256_password',
    }
})
