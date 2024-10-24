# 实现 Excel 导入导出

Excel 的导入导出是后台管理系统的常见功能，我们一般用 exceljs 来实现。

每个 excel 文件下都是独立的表格。也就是 workbook（工作簿） > worksheet（工作表） > row（行） > cell（列）这样的层级关系。解析和生成都是按照这个层次结构来。

## 在 node 和浏览器里解析和生成 excel

- node 解析就是 readFile 之后，遍历 worksheet、row，拿到 cell 中的数据。🌰：.\src\input.js
- node 生成就是 addWorkSheet、addRow 添加数据，然后 writeFile 来写入文件。🌰：.\src\output.js
- 浏览器解析：就把 readFile 换成 load，把 writeFile 换成 writeBuffer 就好了。🌰：.\src\input.html
- 浏览器生成 excel：可以通过 a 标签触发下载，设置 download 属性之后，触发点击就好了。🌰：.\src\output.html
