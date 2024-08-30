import * as session from 'express-session';

// 指定加密的密钥和 cookie 的存活时间，会返回 set-cookie 的响应头，设置了 cookie，包含 sid 也就是 sesssionid。之后每次请求都会自动带上这个 cookie。这样就可以在 session 对象里存储信息了。
export const sessionHandler = () => {
  return session({
    secret: 'keyboard cat',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  });
};
