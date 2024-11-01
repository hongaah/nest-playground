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

// 创建了 user，并且 create 了两个关联的 post
async function test2() {
  const user = await prisma.user.create({
    data: {
      name: 'xxx',
      email: 'xxx@qq.com',
      posts: {
        create: [
          {
            title: 'aaa',
            content: 'aaaa',
          },
          {
            title: 'bbb',
            content: 'bbbb',
          },
        ],
      },
    },
  });
  console.log(user);
}

test2();
