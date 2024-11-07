import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query',
    },
  ],
});

async function createFn() {
  await prisma.department.create({
    data: {
      name: '技术部',
      employees: {
        create: [
          {
            name: '小张',
            phone: '13333333333',
          },
          {
            name: '小李',
            phone: '13222222222',
          },
        ],
      },
    },
  });
}

async function findUniqueFn() {
  const res1 = await prisma.department.findUnique({
    where: {
      id: 1,
    },
    // 通过 include 指定关联查询出 employees
    include: {
      employees: true,
    },
  });
  console.log(res1);

  const res2 = await prisma.department.findUnique({
    where: {
      id: 1,
    },
    // include 还可以指定 where 等查询的参数，进一步过滤
    include: {
      employees: {
        where: {
          name: '小张',
        },
        select: {
          name: true,
        },
      },
    },
  });
  console.log(res2);

  // 查出 department 后调用 empolyees() 方法来查询
  const res3 = await prisma.department
    .findUnique({
      where: {
        id: 1,
      },
    })
    .employees();
  console.log(res3);
}

// 更新 department 的时候关联插入了一条 employee 的记录
async function updateFn() {
  const res1 = await prisma.department.update({
    where: {
      id: 1,
    },
    data: {
      name: '销售部',
      employees: {
        create: [
          {
            name: '小刘',
            phone: '13266666666',
          },
        ],
      },
    },
  });
  console.log(res1);
}

// 更新 department 的时候，和别的 empolyee 建立关联，比如更新 id 为 4 的 empolyee 关联的 id 为 2 的 department 为 1，把 id 为 4 的 empolyee 移动到 id 为 1 的 department 下
async function updateConnectFn() {
  const res1 = await prisma.department.update({
    where: {
      id: 1,
    },
    data: {
      name: '销售部',
      employees: {
        connect: [
          {
            id: 4,
          },
        ],
      },
    },
  });
  console.log(res1);
}

// 如果是某个 id 的数据存在就 connect，不存在就 create
// update 的时候可以通过 create、connect、connectOrCreate 来插入新的关联 model 的记录或者关联已有的记录
async function updateCreateFn() {
  const res1 = await prisma.department.update({
    where: {
      id: 1,
    },
    data: {
      name: '销售部',
      employees: {
        connectOrCreate: {
          where: {
            id: 6,
          },
          create: {
            id: 6,
            name: '小张',
            phone: '13256665555',
          },
        },
      },
    },
  });
  console.log(res1);
}

// 删除 id 为 1 的 department 的所有 empolyee
async function deleteManyFn() {
  await prisma.employee.deleteMany({
    where: {
      department: {
        id: 1,
      },
    },
  });
}

// 当 api 都不能满足需求的时候，Prisma 还可以直接执行 sql
async function executeRawFn() {
  await prisma.$executeRaw`TRUNCATE TABLE Employee`;

  const res = await prisma.$queryRaw`select * from Department`;
  console.log(res);
}

executeRawFn();
// deleteManyFn();
// updateCreateFn();
// updateConnectFn();
// updateFn();
// findUniqueFn();
// createFn();
