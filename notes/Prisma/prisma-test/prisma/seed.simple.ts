import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query',
    },
  ],
});

async function main() {
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

main();
