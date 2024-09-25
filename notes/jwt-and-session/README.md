# 两种登录状态保存方式：JWT、Session

http 是无状态的，也就是请求和请求之间没有关联，但我们很多功能的实现是需要保存状态的。

给 http 添加状态有两种方式：

session + cookie：把状态数据保存到服务端，session id 放到 cookie 里返回，这样每次请求会带上 cookie ，通过 id 来查找到对应的 session。这种方案有 CSRF、分布式 session、跨域的问题。

jwt：把状态保存在 json 格式的 token 里，放到 header 中，需要手动带上，没有 cookie + session 的那些问题，但是也有安全性、性能、没法手动控制失效的问题。

上面这两种方案都不是完美的，但那些问题也都有解决方案。

常用的方案基本是 session + redis、jwt + redis 这种。

🌰：
public\jwtandsession.html
src\jwt-and-session

## mysql + typeorm + jwt + ValidationPipe 实现登录注册

🌰：
src\jwt-and-session\user
http://localhost:3000/jwt-and-session/aaa

typeorm 通过 @PrimaryGeneratedKey、@Column、@CreateDateColumn、@UpdateDateColumn 声明和数据库表的映射。

通过 TypeOrmModule.forRoot、TypeOrmModule.forFeature 的动态模块添加数据源，拿到 User 的 Repository。

然后用 Repository 来做增删改查，实现注册和登录的功能。

登录之后，把用户信息通过 jwt 的方式放在 authorization 的 header 里返回。

然后 LoginGuard 里面取出 header 来做验证，token 正确的话才放行。

此外，参数的校验使用 ValidationPipe + class-validator 来实现。
