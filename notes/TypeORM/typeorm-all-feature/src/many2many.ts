import { AppDataSource } from './data-source';
import { Article } from './entity/Article';
import { Tag } from './entity/Tag';

AppDataSource.initialize()
  .then(async () => {
    const a1 = new Article();
    a1.title = 'aaaa';
    a1.content = 'aaaaaaaaaa';

    const a2 = new Article();
    a2.title = 'bbbbbb';
    a2.content = 'bbbbbbbbbb';

    const t1 = new Tag();
    t1.name = 'ttt1111';

    const t2 = new Tag();
    t2.name = 'ttt2222';

    const t3 = new Tag();
    t3.name = 'ttt33333';

    a1.tags = [t1, t2];
    a2.tags = [t1, t2, t3];

    const entityManager = AppDataSource.manager;

    await entityManager.save(t1);
    await entityManager.save(t2);
    await entityManager.save(t3);

    await entityManager.save(a1);
    await entityManager.save(a2);

    const article1 = await entityManager.find(Article, {
      relations: {
        tags: true,
      },
    });
    console.log(article1);
    console.log(article1.map((item) => item.tags));

    const article2 = await entityManager
      // .getRepository(Article)
      // .createQueryBuilder( "a")
      .createQueryBuilder(Article, 'a')
      .leftJoinAndSelect('a.tags', 't')
      .getMany();
    console.log(article2);
    console.log(article2.map((item) => item.tags));

    const tags1 = await entityManager.find(Tag, {
      relations: {
        articles: true,
      },
    });
    console.log(tags1);

    // 把 id 为 2 的文章的标签只保留包含 111 的，并且还改了标题
    const article = await entityManager.findOne(Article, {
      where: {
        id: 2,
      },
      relations: {
        tags: true,
      },
    });
    article.title = 'ccccc';
    article.tags = article.tags.filter((item) => item.name.includes('ttt111'));
    await entityManager.save(article);

    // 因为中间表的外键设置了 CASCADE 的级联删除，这样只要删除了 article 或者 tag，就都会跟着删除关联记录。
    await entityManager.delete(Article, 1);
    await entityManager.delete(Tag, 1);
  })

  .catch((error) => console.log(error));
