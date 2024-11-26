# class-validator 校验 dto 对象

[class-validator](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fclass-validator%23validation-decorators) 的装饰器可以对 dto 对象做校验：

🌰常用的装饰器，可以对各种类型的数据做精确的校验：src\test-dto-vo\aaa\dto\class-validator-decorators.dto.ts

如果内置的装饰器不符合需求，完全可以自己实现，然后用 @Validate 来应用，用自定义装饰器 applyDecorators 包一层之后，和 class-validator 的内置装饰器就一模一样了。

🌰自定义装饰器：src\test-dto-vo\my-dto\config\my-validator.ts
🌰组合装饰器：src\test-dto-vo\my-dto\config\my-contains.decorator.ts
