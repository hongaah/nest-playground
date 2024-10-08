# dto(data transfer object) 封装请求参数

1. 两个类似的 dto，可以基于已有的对象来创建，结合类型继承

🌰：src\test-dto-vo\aaa\dto\update-aaa.dto.ts

@nestjs/mapped-types 的 PartialType、PickType、OmitType、IntersectionType 等类型继承可以避免重复：

- PickType 从已有 dto 类型中取某个字段
- OmitType 从已有 dto 类型中去掉某个字段
- PartialType 把 dto 类型变为可选
- IntersectionType 组合多个 dto 类型
