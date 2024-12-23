FROM node:18-alpine3.14

# ADD、COPY 都可以用于把目录下的文件复制到容器内的目录下
# ADD 可以把 tar.gz 给解压然后复制到容器内
ADD ./aaa.tar.gz /aaa
# COPY 没有解压，它把文件整个复制过去
COPY ./aaa.tar.gz /bbb
