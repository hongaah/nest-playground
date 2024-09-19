import { AppDataSource } from './data-source';
import { User } from './entity/User';

AppDataSource.initialize()
  .then(async () => {
    const user = new User();
    // 指定了 id，就是修改
    // user.id = 1;
    user.firstName = 'aaa';
    user.lastName = 'xxx';
    user.age = 25;

    /**
     * query 和 createQueryBuilder
     *
     * query 直接执行 sql 语句
     * 复杂的关联查询，涉及到多个表的，不会直接写 sql 语句，而是会用 query builder
     * 简单的查询直接 find 指定 where 条件
     */
    const usersq1 = await AppDataSource.manager.query(
      'select * from user where age in(?, ?)',
      [21, 22],
    );

    const queryBuilder = await AppDataSource.manager.createQueryBuilder();
    const userqb1 = await queryBuilder
      .select('user')
      .from(User, 'user')
      .where('user.age = :age', { age: 21 })
      .getOne();

    console.log(usersq1, userqb1);

    /**
     * 简化传入实体类 etRepository(Xxx)
     */
    await AppDataSource.manager.getRepository(User).find();

    /**
     * 事务 transaction
     *
     * 多条有关联的数据的增删改需要用事务
     */
    await AppDataSource.manager.transaction(async (manager) => {
      await manager.save(User, {
        id: 4,
        firstName: 'eee',
        lastName: 'eee',
        age: 20,
      });
    });
    /**
     * save
     *
     * 批量插入和修改
     * save 方法会先查询一次数据库来确定是插入还是修改, update 和 insert 方法不会。
     *
     */
    await AppDataSource.manager.save(user);
    await AppDataSource.manager.save(User, [
      { id: 2, firstName: 'ccc111', lastName: 'ccc', age: 21 },
      { id: 3, firstName: 'ddd222', lastName: 'ddd', age: 22 },
      { id: 4, firstName: 'eee333', lastName: 'eee', age: 23 },
    ]);

    /**
     * delete 和 remove
     *
     * 删除和批量删除
     * delete 和 remove 的区别是，delete 直接传 id、而 remove 则是传入 entity 对象。
     *
     */
    await AppDataSource.manager.delete(User, 1);
    await AppDataSource.manager.delete(User, [2, 3]);
    await AppDataSource.manager.remove(User, user);

    /**
     * find 查询
     *
     * findBy 方法根据条件查询
     * findAndCount 拿到有多少条记录
     * findAndCountBy 可以指定条件查询有多少条记录
     * findOne 可以查询一条，findOne 只是比 find 多加了个 LIMIT 1，其余的都一样。
     * findOneBy
     * findOneOrFail 或者 findOneByOrFail，如果没找到，会抛一个 EntityNotFoundError 的异常
     */
    const users1 = await AppDataSource.manager.find(User);
    const users2 = await AppDataSource.manager.findBy(User, {
      age: 23,
    });
    const [users3, count3] = await AppDataSource.manager.findAndCount(User);
    const [users4, count4] = await AppDataSource.manager.findAndCountBy(User, {
      age: 23,
    });
    const user5 = await AppDataSource.manager.findOne(User, {
      select: {
        firstName: true,
        age: true,
      },
      where: {
        id: 4,
        // id: In([4, 8]),
      },
      order: {
        age: 'ASC',
      },
    });
    const user6 = await AppDataSource.manager.findOneBy(User, {
      age: 23,
    });
    try {
      const user7 = await AppDataSource.manager.findOneOrFail(User, {
        where: {
          id: 666,
        },
      });
      console.log(user7);
    } catch (e) {
      console.log(e);
      console.log('没找到该用户');
    }
    console.log(
      'Loaded users: ',
      users1,
      users2,
      users3,
      count3,
      users4,
      count4,
      user5,
      user6,
    );

    console.log(
      'Here you can setup and run express / fastify / any other framework.',
    );
  })
  .catch((error) => console.log(error));
