# 使用 ARG 增加构建灵活性

# 通过 --build-arg xxx=yyy 传入 ARG 参数的值
# docker build --build-arg aaa=3 --build-arg bbb=4 -t arg-test -f 333.Dockerfile .
# 点击查看镜像详情，可以看到 ARG 已经被替换为具体的值了

# 使用 18 版本的 node 镜像，体积量小的基础镜像 alpine linux 发行版
FROM node:18-alpine3.14

# 使用 ARG 声明构建参数，使用 ${xxx} 来取
ARG aaa
ARG bbb

WORKDIR /app

COPY ./test.js .

# 用 ENV 声明环境变量
# dockerfile 内换行使用 \
ENV aaa=${aaa} \
    bbb=${bbb}

CMD ["node", "/app/test.js"]
