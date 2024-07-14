FROM node:18-alpine3.14

# 容器启动时执行的命令
# 用 ENTRYPOINT + CMD 的方式更加灵活，当没传参数的时候，执行的是 ENTRYPOINT + CMD 组合的命令，而传入参数的时候，只有 CMD 部分会被覆盖。
# docker run cmd-test 会输出 111 222
# docker run cmd-test 66666 会输出 111 66666
ENTRYPOINT ["echo", "111"]

CMD ["222"]
