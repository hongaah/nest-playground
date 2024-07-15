# 使用多阶段构建，减少镜像内不必要的源码和构建的依赖，这样 docker build 之后，只会留下最后一个阶段的镜像

# build stage
FROM node:18-alpine3.14 as build-stage

WORKDIR /app

# 先复制 package.json 进去，安装依赖之后再复制其他文件，这样如果 package.json 没变，那么就不会执行 npm install，直接复用之前的。因为 docker 是分层存储的，dockerfile 里的每一行指令是一层，会做缓存。每次 docker build 的时候，只会从变化的层开始重新构建，没变的层会直接复用。
COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage
# FROM 后面添加一个 as 来指定当前构建阶段的名字
FROM node:18-alpine3.14 as production-stage

# 通过 COPY --from=xxx 可以从上个阶段复制文件过来
COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

# 只安装 dependencies 的依赖
RUN npm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]
