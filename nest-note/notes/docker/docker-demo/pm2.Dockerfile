# pm2 与 docker 结合起来运用，解决 docker 容器内 node 服务崩溃了重启问题，实现 docker 容器内进程的日志管理、进程管理和监控。

# build stage
FROM node:18 AS build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18 AS production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm install --production

# 一般都是 docker 镜像内安装 pm2 来跑 node
RUN npm install pm2 -g

EXPOSE 3000

# 用 pm2 代替 node 来跑
CMD ["pm2-runtime", "/app/main.js"]
