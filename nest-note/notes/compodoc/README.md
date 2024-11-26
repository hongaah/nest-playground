# compodoc

[compodoc 文档](https://compodoc.app/guides/options.html)

用 compodoc 可以生成 nest 项目的文档，它会列出项目的模块，可视化展示模块之间的依赖关系和模块结构，展示每个模块下的 provider、exports 等。对于复杂项目来说，有帮助于快速缕清思路。

compodoc 本来是给 angular 项目生成项目文档的，但是因为 angular 和 nest 项目结构类似，所以也支持了 nest。

```sh
# install
pnpm i -D @compodoc/compodoc

# start 生成文档
# -p 是指定 tsconfig 文件
# -s 是启动静态服务器
# -o 是打开浏览器
# --theme 可以指定主题，一共有 gitbook,aravel, original, material, postmark, readthedocs, stripe, vagrant
npx @compodoc/compodoc -p tsconfig.json -s -o --theme postmark

# 通过配置文件运行
npx @compodoc/compodoc -p tsconfig.json -s -o -c .compodoc.json

```
