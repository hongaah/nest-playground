# Nest 实现原理之 Reflect metadata

Reflect 提供了一些拦截JavaScript操作的静态方法，这些方法与Proxy中的`handlers`中的方法一致，比如可以操作对象的属性、方法、构造器的一些 api，已经是 es 标准了，也被很多浏览器实现了。

```ts
const obj = {
  a: 1,
  b: 2
}
Reflect.set(obj, 'c', 3) // true
Reflect.get(obj, 'a')  // 1
Reflect.has(obj, 'a')  // true
Reflect.apply(Math, null, [1, 2, 3]) // 6
Reflect.construct(Array, [1, 2]) // [1, 2]
```

## 核心实现原理

Nest 的装饰器的实现原理就是 Reflect.getMetadata、Reflect.defineMetadata 这些 api。通过装饰器给 class、handler 上添加元数据，然后扫描到它的时候取出 metadata 来做相应的处理来完成各种功能。比如初始化的时候取出这些元数据，进行依赖的分析，然后创建对应的实例对象

```ts
Reflect.defineMetadata(metadataKey, metadataValue, target);
Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);

const result = Reflect.getMetadata(metadataKey, target);
const result = Reflect.getMetadata(mtadataKey, target, propertyKey);
```

如果给类或者类的静态属性添加元数据，那就保存在类上，如果给实例属性添加元数据，那就保存在对象上，用类似 [[metadata]] 的 key 来存的。

```ts
@Reflect.metadata(metadataKey, metadataValue)
class C {

  @Reflect.metadata(metadataKey, metadataValue)
  method() {
  }
}
```

Nest 的 Controller、Module、Service 等等所有的装饰器都是通过 Reflect.meatdata 给类或对象添加元数据的，然后初始化的时候取出来做依赖的扫描，实例化后放到 IOC 容器里。

```ts :nest 实现 @Module
// nest 实现 @Module
export function Module(metadata: ModuleMetadata): ClassDecorator {
  const propsKeys = Object.keys(metadata);
  validateModuleKeys(propsKeys);

  return (target: Function) => {
    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, (metadata as any)[property], target);
      }
    }
  };
}

// 使用
// 其实就是给 CatsModule 添加了 controllers 的元数据和 providers 的元数据
@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
```

实例化对象还需要知道构造器参数的类型，但以下示例没有添加 metadata，是因为开启 ts 的 `emitDecoratorMetadata` 的编译选项之后， ts 在编译时自动添加一些 metadata 数据，也就是 `design:type`、`design:paramtypes`、`design:returntype` 这三个，分别代表被装饰的目标的类型、参数的类型、返回值的类型。所以在 nest 源码里会看到 `Reflect.getMetadata('design:paramtypes', target)`，就是获取参数的类型。

```ts
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
}
```

所以 nest 的核心实现原理：通过装饰器给 class 或者对象添加 metadata，并且开启 ts 的 emitDecoratorMetadata 来自动添加类型相关的 metadata，然后运行的时候通过这些元数据来实现依赖的扫描，对象的创建等等功能。

reflect metadata 的 api 还在草案阶段，需要引入 reflect metadata 的包做 polyfill。

## @SetMetadata

Nest 还提供了 @SetMetadata 的装饰器，可以在 controller 的 class 和 method 上添加 metadata，然后在 interceptor 和 guard 里通过 reflector 的 api 取出来。

🌰：src\decorator\decorator.controller.ts

```ts
import { Reflector } from '@nestjs/core';

@Inject(Reflector) private readonly reflector: Reflector;

// get 的实现就是 Reflect.getMetadata
const classMetadata = this.reflector.get('roles', context.getClass());
const methodMetadata = this.reflector.get('roles', context.getHandler());

// getAll 是返回一个 metadata 的数组
this.reflector.getAll('roles', [context.getClass(), context.getHandler()]);

// getAllAndMerge，会把它们合并为一个对象或者数组
this.reflector.getAllAndMerge('roles', [context.getClass(), context.getHandler()]);

// getAllAndOverride 会返回第一个非空的 metadata
this.reflector.getAllAndOverride('roles', [context.getClass(), context.getHandler()]);
```

