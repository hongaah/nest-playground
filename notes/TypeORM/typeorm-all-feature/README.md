# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

## note

DataSource 里管理着数据库连接配置，数据库驱动包，调用它的 intialize 方法会创建和 mysql 的连接。

连接创建的时候，如果指定了 synchronize，会根据 Entitiy 生成建表 sql。

Entity 里通过 @Entity 指定和数据库表的映射，通过 @PrimaryGeneratedColumn 和 @Column 指定和表的字段的映射。

对 Entity 做增删改查通过 EntityManager 的 save、delete、find、createQueryBuilder 等方法。

如果只是对单个 Entity 做 CRUD，那可以先 getRepository 拿到对具体 Entity 操作的工具类，再调用 save、delete、find 等方法。

具体的 EntityManager 和 Repository 的方法有这些：

  save：新增或者修改 Entity，如果传入了 id 会先 select 再决定修改还新增
  update：直接修改 Entity，不会先 select
  insert：直接插入 Entity
  delete：删除 Entity，通过 id
  remove：删除 Entity，通过对象
  find：查找多条记录，可以指定 where、order by 等条件
  findBy：查找多条记录，第二个参数直接指定 where 条件，更简便一点
  findAndCount：查找多条记录，并返回总数量
  findByAndCount：根据条件查找多条记录，并返回总数量
  findOne：查找单条记录，可以指定 where、order by 等条件
  findOneBy：查找单条记录，第二个参数直接指定 where 条件，更简便一点
  findOneOrFail：查找失败会抛 EntityNotFoundError 的异常
  query：直接执行 sql 语句
  createQueryBuilder：创建复杂 sql 语句，比如 join 多个 Entity 的查询
  transaction：包裹一层事务的 sql
  getRepository：拿到对单个 Entity 操作的类，方法同 EntityManager
