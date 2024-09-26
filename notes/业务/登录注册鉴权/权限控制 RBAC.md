# 权限控制 RBAC

基于角色的权限控制 RBAC（Role Based Access Control），它相比于 ACL （access control list）的方式，多了一层角色，给用户分配角色而不是直接分配权限。

🌰：src\auth-rbac，这是 RBAC0 的方案，更复杂一点的权限模型，可能会用 RBAC1、RBAC2 等，那个就是多角色继承、用户组、角色之间互斥之类的概念，会了 RBAC0，那些也就是做一些变形的事情。

实现：

检查权限的时候还是要把角色的权限合并之后再检查是否有需要的权限的。通过 jwt 实现登录，把用户和角色信息放到 token 里返回。添加 LoginGuard 来做登录状态的检查。然后添加 PermissionGuard 来做权限的检查。

LoginGuard 里从 jwt 取出 user 信息放入 request，PermissionGuard 从数据库取出角色对应的权限，检查目标 handler 和 controller 上声明的所需权限是否满足。

LoginGuard 和 PermissionGuard 需要注入一些 provider，所以通过在 AppModule 里声明 APP_GUARD 为 token 的 provider 来注册的全局 Gard。

然后在 controller 和 handler 上添加 metadata 来声明是否需要登录，需要什么权限，之后在 Guard 里取出来做检查。
