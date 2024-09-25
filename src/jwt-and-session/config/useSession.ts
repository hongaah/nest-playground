import * as session from 'express-session';

// 在 main.ts 入口文件中引入 session
export const useSession: any = () => {
  return session({
    secret: 'secret',
    // resave 为 true 是每次访问都会更新 session，不管有没有修改 session 的内容，而 false 是只有 session 内容变了才会去更新 session。
    resave: false,
    // saveUninitalized 设置为 true 是不管是否设置 session，都会初始化一个空的 session 对象。比如你没有登录的时候，也会初始化一个 session 对象，这个设置为 false 就好。
    saveUninitialized: false,
  });
};
