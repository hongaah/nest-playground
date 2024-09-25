import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TestEnvService } from './test-env.service';
import { TestEnvController } from './test-env.controller';
import config from './config';
import configYmal from './config-yaml';
import * as path from 'path';

// 环境配置文件
@Module({
  imports: [
    // 全局配置
    ConfigModule.forRoot({
      // 注册为全局模块，无需在 app.module 注册，全局任何地方都可以用
      isGlobal: true,

      envFilePath: [
        // 默认读取根目录的 .env，配置的会优先，顺序在前面的也会覆盖后面的配置
        path.join(process.cwd(), '/src/test-env/.aaa.env'),
        path.join(process.cwd(), '/src/test-env/.env'),
      ],

      // 动态配置 前面的配置会覆盖后面的配置
      load: [configYmal, config],
    }),

    // 局部配置
    ConfigModule.forFeature(() => {
      return {
        ddd: 222,
      };
    }),
  ],
  controllers: [TestEnvController],
  providers: [TestEnvService],
})
export class TestEnvModule {}
