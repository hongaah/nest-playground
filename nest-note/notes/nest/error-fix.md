# nest 问题解决

#### nest g resource xxx 报错 SyntaxError: Expected double-quoted property name in JSON at position 430

检查 nest-cli.json 配置文件： 打开项目根目录下的 nest-cli.json 文件，确保所有的 JSON 键（属性名）都使用双引号，并且没有多余的逗号、遗漏的括号或其他格式错误。

检查其他 JSON 配置文件： 如果你有其他 JSON 格式的配置文件（如 tsconfig.json、package.json 等），也需要检查它们是否符合 JSON 格式要求，特别是：属性名是否用双引号包围。逗号是否正确放置，避免多余的逗号或漏掉逗号。
