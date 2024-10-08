# dto(data transfer object) 封装请求参数

1. 两个类似的 dto，可以基于已有的对象来创建，结合类型继承

🌰：src\test-dto-vo\aaa\dto\update-aaa.dto.ts

@nestjs/mapped-types 的 PartialType、PickType、OmitType、IntersectionType 等类型继承可以避免重复：

- PickType 从已有 dto 类型中取某个字段
- OmitType 从已有 dto 类型中去掉某个字段
- PartialType 把 dto 类型变为可选
- IntersectionType 组合多个 dto 类型

## 校验 dto 对象

[class-validator](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fclass-validator%23validation-decorators) 的装饰器可以对 dto 对象做校验：

🌰常用的装饰器，可以对各种类型的数据做精确的校验：src\test-dto-vo\aaa\dto\class-validator-decorators.dto.ts

如果内置的装饰器不符合需求，完全可以自己实现，然后用 @Validate 来应用，用自定义装饰器 applyDecorators 包一层之后，和 class-validator 的内置装饰器就一模一样了。

🌰自定义装饰器：src\test-dto-vo\aaa\config\my-validator.ts
🌰组合装饰器：src\test-dto-vo\aaa\config\my-contains.decorator.ts
