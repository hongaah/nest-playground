import { AppDataSource } from './data-source';
import { IdCard } from './entity/IdCard';
import { User } from './entity/User';

// 一对一关系的映射和增删改查
AppDataSource.initialize()
  .then(async () => {
    const user = new User();
    // user.id = 1;
    user.firstName = 'XXX';
    user.lastName = 'XXX';
    user.age = 20;

    const idCard = new IdCard();
    // idCard.id = 1;
    idCard.cardName = '1111111';
    // 设置 idCard.user 为 user，建立关联
    idCard.user = user;

    await AppDataSource.manager.save(user);
    await AppDataSource.manager.save(idCard);

    // 查 idCard 和关联的 user
    const ics1 = await AppDataSource.manager.find(IdCard, {
      relations: {
        user: true,
      },
    });

    // 同上，用 query builder 的方式来查询
    const ics2 = await AppDataSource.manager
      .getRepository(IdCard)
      .createQueryBuilder('ic') // IdCard 别名 ic
      .leftJoinAndSelect('ic.user', 'u')
      .getMany();

    // 查 user 和关联的 idCard
    const user1 = await AppDataSource.manager.find(User, {
      relations: {
        idCard: true,
      },
    });

    // 因为设置了外键的 onDelete 是 cascade，所以只要删除了 user，那关联的 idCard 就会跟着被删除。
    await AppDataSource.manager.delete(User, 1);

    console.log(ics1, ics2, user1);
  })
  .catch((error) => console.log(error));
