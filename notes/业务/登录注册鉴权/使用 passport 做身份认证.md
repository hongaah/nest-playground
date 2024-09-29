# 使用 passport 做身份认证

之前都是自己实现身份认证，比如基于用户名密码的认证，基于 jwt 的认证，其实都是可以基于 passport 库来实现了一遍。因为每次做各种认证的时候，都一样，所以 passport 提供了 Strategy 来简化这一过程。

passport 把不同的认证逻辑封装成了不同 Strategy，每个 Stategy 都有 validate 方法来验证。每个 Strategy 都是从 request 取出一些东西，交给 validate 方法验证，validate 方法返回 user 信息，自动放到 request.user 上。

并且 @nestjs/passport 提供了 Guard 可以直接用，如果想扩展，继承 AuthGuard('xxx') 然后重写下 canActivate 方法就好了。
