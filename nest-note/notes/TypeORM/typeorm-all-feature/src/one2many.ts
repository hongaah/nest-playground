import { Department } from './entity/Department';
import { Employee } from './entity/Employee';
import { AppDataSource } from './data-source';

// 一对多关系的映射和增删改查
AppDataSource.initialize()
  .then(async () => {
    const e1 = new Employee();
    e1.name = '张三';
    // e1.department = d1;

    const e2 = new Employee();
    e2.name = '李四';
    // e2.department = d1;

    const e3 = new Employee();
    e3.name = '王五';
    // e3.department = d1;

    const d1 = new Department();
    d1.name = '技术部';
    d1.employees = [e1, e2, e3];

    // Employee 设置了 cascade，所以可以只需要保存 empolyee
    // await AppDataSource.manager.save(Employee, [e1, e2, e3]);

    // 不过一对多关系更多还是在一的那一方来保持关系。
    // 如果保存 department，关联的 employee 也都会保存了，这时候要把 @ManyToOne 的 cascade 去掉。不然，双方都级联保存，就会无限循环了。
    await AppDataSource.manager.save(Department, d1);

    // 关联查询需要声明下 relations
    const deps = await AppDataSource.manager.find(Department, {
      // relations 即 left join on
      relations: {
        employees: true,
      },
    });
    console.log(deps);
    console.log(deps.map((item) => item.employees));

    // 关联查询可以通过 query builder 来手动关联
    const es = await AppDataSource.manager
      // .getRepository(Department)
      // .createQueryBuilder('d')
      .createQueryBuilder(Department, 'd')
      .leftJoinAndSelect('d.employees', 'e')
      .getMany();

    console.log(es);
    console.log(es.map((item) => item.employees));

    // 删除，需要先把关联的 employee 删了，再删除 department。或者多对一的那边，设置 onDelete。
    // await AppDataSource.manager.delete(Employee, deps[0].employees);
    // await AppDataSource.manager.delete(Department, deps[0].id);
  })
  .catch((error) => console.log(error));
