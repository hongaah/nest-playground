# 登录状态无感刷新 单 token 无限续期

🌰：
src\auth-rbac\config\login.singleToken.guard.ts
public\single_token.html

单 token 无限续期好处就是简单，只要每次请求接口，快过期的时候返回新 token，然后刷新下本地 token 就可以了。
前端在 axios 的 response 拦截器里拿到后端返回的 header token 进行更新即可，比双 token 的无感刷新简单。


前端如果需要访问到 header，需要在服务端配置下 expose headers：

```ts :main.ts
  app.enableCors({
    exposedHeaders: ['token'],
  });
```

