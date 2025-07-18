import { Global, forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TestGlobalService } from './test-global.service';
import { TestGlobalController } from './test-global.controller';
import { MyLoggerModule } from '../my-logger/my-logger.module';
import { MyWinstonLoggerModule } from '../my-winston-logger/my-winston-logger.module';
import { CircularDependencyModule } from 'src/circular-dependency/circular-dependency.module';
import { format, transports } from 'winston';
import * as chalk from 'chalk';

@Global()
@Module({
  imports: [
    forwardRef(() => CircularDependencyModule),
    // 导入一个动态模块，logger
    MyLoggerModule.register({
      x: 1,
      y: 2,
    }),

    // 动态 winston logger
    MyWinstonLoggerModule.forRoot({
      level: 'debug',
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ context, level, message, time }) => {
              const appStr = chalk.green(`[NEST]`);
              const contextStr = chalk.yellow(`[${context}]`);

              return `${appStr} ${time} ${level} ${contextStr} ${message} `;
            }),
          ),
        }),

        new transports.File({
          format: format.combine(format.timestamp(), format.json()),
          filename: '111.log',
          dirname: 'log',
        }),
      ],
    }),

    ConfigModule.forFeature(() => {
      return {
        xxx: 333,
      };
    }),
  ],
  controllers: [TestGlobalController],
  providers: [TestGlobalService],
  exports: [TestGlobalService],
})
export class TestGlobalModule {}
