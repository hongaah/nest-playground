# passport 实现 GitHub 三方账号登录

很多网站都支持三方登录，比如基于 passport 的 GitHub 策略实现了三方登录，核心就是要获取 clientID、clientSecret，然后在 GithubStrategy 的构造函数传入这些信息，在 validate 方法里就可以拿到返回的用户信息 profile。

我们的服务就只要在用户表存一个 githubId 的字段，用 github 登录之后根据 id 查询用户信息，实现登录就好了。这样就免去了每次登录都输入用户名密码的麻烦。

clientID、clientSecret 配置步骤：

```
https://github.com/settings/developers/ -> OAuth apps -> nest-passport-github

http://localhost:3000/my-passport-github
http://localhost:3000/my-passport-github/callback

Client ID：Ov23liQ3G5iEL6nlOW2X
Client Secret：2fe01ca0d1582d5e8d54dec5ab93cbd7b2936477
```