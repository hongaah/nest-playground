# 登录状态无感刷新 access_token 和 refresh_token

jwt 是有有效期的，我们设置的是 7 天，实际上为了安全考虑会设置的很短，比如 30 分钟。这时候用户可能还在访问系统的某个页面，结果访问某个接口返回 token 失效了，让重新登录。交互体验会很差，所以为了解决这个问题，服务端一般会返回两个 token：access_token 和 refresh_token，access_token 用于身份认证，refresh_token 用于刷新 token，也就是续签。

🌰：
后端：src\auth-rbac\user\user.controller.ts

使用 JWT 的认证方式，在登录接口里同时返回 access_token 和 refresh_token，access_token 设置较短的过期时间，比如 30 分钟，refresh_token 设置较长的过期时间，比如 7 天。当 access_token 失效的时候，可以用 refresh_token 去刷新，服务端会根据其中的 userId 查询用户数据，返回新 token。

前端：public\access_token&refresh_token.html

在登录之后，把 token 放在 localstorage 里。然后用 axios 的 interceptors.request 给请求时自动带上 authorization 的 header。用 intercetpors.response 在响应是 401 的时候，自动访问 refreshToken 接口拿到新 token，然后再次访问失败的接口。并且并发请求时，如果 token 过期，会把请求放到队列里，只刷新一次，刷新完批量重发请求。
