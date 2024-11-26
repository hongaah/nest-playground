# mysql + typeorm + jwt + ValidationPipe 实现登录注册

🌰：
src\jwt-and-session\user
http://localhost:3000/jwt-and-session/aaa

typeorm 通过 @PrimaryGeneratedKey、@Column、@CreateDateColumn、@UpdateDateColumn 声明和数据库表的映射。
通过 TypeOrmModule.forRoot、TypeOrmModule.forFeature 的动态模块添加数据源，拿到 User 的 Repository。然后用 Repository 来做增删改查，实现注册和登录的功能。登录之后，把用户信息通过 jwt 的方式放在 authorization 的 header 里返回。然后 LoginGuard 里面取出 header 来做验证，token 正确的话才放行。

此外，参数的校验使用 ValidationPipe + class-validator 来实现。
