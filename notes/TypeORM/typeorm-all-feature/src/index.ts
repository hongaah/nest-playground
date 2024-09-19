import { AppDataSource } from './data-source';

// 一对一关系的映射和增删改查
AppDataSource.initialize()
  .then(async () => {
    //
  })
  .catch((error) => console.log(error));
