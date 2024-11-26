# passport 实现 Google 三方账号登录

基于 passport 的 Google 策略实现了三方登录，就是基于 google 账号里的东西，再让用户填一些东西之后，完成账号注册。如果信息不够，可以重定向到一个 url 让用户填写其余信息。之后用户 google 登录，就会查到这个账号，从而直接登录，不用输密码。

核心也是要获取 clientID、clientSecret，然后在 GithubStrategy 的构造函数传入这些信息，在 validate 方法里就可以拿到返回的用户信息 profile。

🌰：src\my-passport-google

clientID、clientSecret 配置步骤：

```
https://link.juejin.cn/?target=https%3A%2F%2Fconsole.cloud.google.com%2Fwelcome -> OAuth apps -> nest-passport-google

http://localhost:3000
http://localhost:3000/my-passport-google/google
http://localhost:3000/my-passport-google/callback

创建凭据：
Client ID：480901921965-s42tk15t3kc9e399s7pb5du8fknenu38.apps.googleusercontent.com
Client Secret：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
```

### Failed to obtain access token
