# 解决 Module 和 Module 之间相互引用、形成循环依赖

🌰：circular-dependency/circular-dependency.service & /test-global/test-global.service

对于循环依赖，需要确保所有模块都注册完毕，再进行实例化。用 forwardRef 的方式可以先单独创建 Module 和 Provider，然后再让两者关联起来，把引用转发到对方。

```ts
@Module({
  imports: [
    forwardRef(() => CircularDependencyModule),
  ]
})

@Injectable()
export class TestGlobalService {
  @Inject(forwardRef(() => CircularDependencyService))
  private readonly circularDependencyService: CircularDependencyService;
}
```
