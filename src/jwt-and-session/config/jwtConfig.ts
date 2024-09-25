import { JwtModule } from '@nestjs/jwt';

// 在 AppModule 注册 JwtModule
export const jwtConfig = {
  // 声明为全局模块，这样就不用每个模块都引入了
  global: true,

  // 加密 jwt 的密钥
  secret: 'hazel',

  signOptions: {
    // token 过期时间设置 7 天
    expiresIn: '7d',
  },
};

// JwtModule 是一个动态模块，通过 register 传入 option
export const jwtModuleRegiser = JwtModule.register(jwtConfig);

// 或者是 registerAsync，然后通过 useFactory 异步拿到 option 传入
export const jwtModuleAsyncRegiser = JwtModule.registerAsync({
  useFactory: async () => {
    await 111;
    return jwtConfig;
  },
});
