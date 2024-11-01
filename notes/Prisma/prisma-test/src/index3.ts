import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  // 开启 prisma 的 log，打印 sql
  log: [
    {
      emit: 'stdout',
      level: 'query',
    },
  ],
});

// 更新
async function test3() {
  await prisma.post.update({
    where: {
      id: 2,
    },
    data: {
      content: 'xxx',
    },
  });
}

// 删除
async function test4() {
  await prisma.post.delete({
    where: {
      id: 2,
    },
  });
}

// test3();
test4();
