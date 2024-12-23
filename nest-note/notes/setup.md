# nest-node setup

nvm: 18.17.0 +
pnpm i
docker: run: mysql8, redis
mysql: new database: following_test, todolist
prisma: 
  rewite schema.part1.prisma, schema.todolist.prisma => nest-note/prisma/schema.prisma
  run: npx prisma generate --schema prisma/schema.prisma

pnpm start:dev
