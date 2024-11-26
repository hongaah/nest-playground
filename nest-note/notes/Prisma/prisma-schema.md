[prisma-schema](https://www.prisma.io/docs/orm/prisma-schema)

🌰：常用的 schema 语法：notes\Prisma\prisma-test\prisma\schema.all.prisma

generator 部分可以指定多种生成器，比如生成 json 生成 docs 等，可以指定生成代码的位置。datasource 是配置数据库的类型和连接 url 的。

model 部分定义和数据库表的对应关系：

@id 定义主键
@default 定义默认值
@map 定义字段在数据库中的名字
@db.xx 定义对应的具体类型
@updatedAt 定义更新时间的列
@unique 添加唯一约束
@relation 定义外键引用
@@map 定义表在数据库中的名字
@@index 定义索引
@@id 定义联合主键

此外，还可以通过 enum 来创建枚举类型。