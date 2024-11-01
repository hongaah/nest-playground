import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 创建了 2 个 user，然后查询出来
async function test1() {
  await prisma.user.create({
    data: {
      name: 'hazel',
      email: '111@qq.com',
    },
  });

  await prisma.user.create({
    data: {
      name: 'hong',
      email: '222@qq.com',
    },
  });

  const users = await prisma.user.findMany();
  console.log(users);
}

test1();
