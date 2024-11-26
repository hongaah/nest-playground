import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query',
    },
  ],
});

async function findUniqueFn() {
  const aaa = await prisma.aaa.findUnique({
    where: {
      id: 1,
    },
  });
  console.log(aaa);

  const bbb = await prisma.aaa.findUnique({
    where: {
      email: 'bbb@xx.com',
    },
    // 通过 select 来指定返回的列
    select: {
      name: true,
      email: true,
    },
  });
  console.log(bbb);
}

// findUniqueOrThrow 如果没找到会抛出错误
async function findUniqueOrThrowFn() {
  const aaa = await prisma.aaa.findUniqueOrThrow({
    where: {
      id: 10,
    },
  });
  console.log(aaa);
}

// findMany 查询多个
async function findManyFn() {
  const res = await prisma.aaa.findMany({
    // 查找 email 包含 xx 的记录
    where: {
      email: {
        contains: 'xx',
      },
    },
    // 按照 name 降序排列
    orderBy: {
      name: 'desc',
    },
    // 加个分页，取从第 2 条开始的 3 条
    skip: 2,
    take: 3,
  });
  console.log(res);
}

// findFirst 和 findMany 的唯一区别是，这个返回第一条记录
async function findFirstFn() {
  const res = await prisma.aaa.findFirst({
    where: {
      email: {
        contains: 'xx',
        endsWith: '',
        equals: '',
        gt: '',
        gte: '',
        in: [''],
        lt: '',
        lte: '',
        not: '',
        notIn: [''],
        startsWith: '',
      },
    },
    select: {
      id: true,
      email: true,
    },
    orderBy: {
      name: 'desc',
    },
    skip: 2,
    take: 3,
  });
  console.log(res);
}

// create 创建记录
async function createFn() {
  const res = await prisma.aaa.create({
    data: {
      name: 'kk',
      email: 'kk@xx.com',
    },
    select: {
      email: true,
    },
  });
  console.log(res);
}

// create 创建记录
async function createManyFn() {
  const res = await prisma.aaa.createMany({
    data: [
      {
        name: '111',
        email: '111@xx.com',
      },
      {
        name: '222',
        email: '222@xx.com',
      },
      {
        name: '333',
        email: '333@xx.com',
      },
      {
        name: '444',
        email: '444@xx.com',
      },
      {
        name: '555',
        email: '555@xx.com',
      },
    ],
  });

  console.log(res);
}

// update 更新记录
async function updateFn() {
  const res = await prisma.aaa.update({
    where: { id: 3 },
    data: { email: '3333@xx.com' },
    select: {
      id: true,
      email: true,
    },
  });
  console.log(res);
}

// updateMany 更新多条记录
async function updateManyFn() {
  const res = await prisma.aaa.updateMany({
    where: {
      email: {
        contains: 'xx.com',
      },
    },
    data: { age: 18 },
  });
  console.log(res);
}

// upsert 是 update 和 insert 的意思，当传入的 id 有对应记录的时候，会更新，否则，会创建记录
async function upsertFn() {
  const res = await prisma.aaa.upsert({
    where: { id: 11 },
    update: { email: 'yy@xx.com' },
    create: {
      id: 11,
      name: 'xxx',
      email: 'xxx@xx.com',
    },
  });
  console.log(res);
}

// delete 删除记录
async function deleteFn() {
  await prisma.aaa.delete({
    where: { id: 1 },
  });

  await prisma.aaa.deleteMany({
    where: {
      id: {
        in: [11, 2],
      },
    },
  });
}

// count 统计记录
async function countFn() {
  const res = await prisma.aaa.count({
    where: {
      email: {
        contains: 'xx',
      },
    },
    orderBy: {
      name: 'desc',
    },
    skip: 2,
    take: 3,
  });
  console.log(res);
}

// aggregate 聚合查询
async function aggregateFn() {
  const res = await prisma.aaa.aggregate({
    where: {
      email: {
        contains: 'xx.com',
      },
    },
    _count: {
      _all: true,
    },
    _max: {
      age: true,
    },
    _min: {
      age: true,
    },
    _avg: {
      age: true,
    },
  });
  console.log(res);
}

// groupBy 分组查询
// 按照 email 分组，过滤出平均年龄大于 2 的分组，计算年龄总和返回
async function groupByFn() {
  const res = await prisma.aaa.groupBy({
    by: ['email'],
    _count: {
      _all: true,
    },
    _sum: {
      age: true,
    },
    having: {
      age: {
        _avg: {
          gt: 2,
        },
      },
    },
  });
  console.log(res);
}

groupByFn();
// aggregateFn();
// countFn();
// deleteFn();
// upsertFn();
// updateManyFn();
// updateFn();
// createManyFn();
// createFn();
// findFirstFn();
// findManyFn();
// findUniqueOrThrowFn();
// findUniqueFn();
