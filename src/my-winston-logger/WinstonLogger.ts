import { LoggerService } from '@nestjs/common';
import * as chalk from 'chalk';
import * as dayjs from 'dayjs';
import { createLogger, Logger, format, transports } from 'winston';

export class WinstonLogger implements LoggerService {
  private logger: Logger;

  constructor(options?: Record<string, any>) {
    const defaultOptions = {
      level: 'debug',
      // format: format.combine(format.colorize(), format.simple()),
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
          filename: '1.log',
          dirname: 'log',
        }),
      ],
    };

    this.logger = createLogger(options ? options : defaultOptions);
  }

  log(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('info', message, { context, time });
  }

  error(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('error', message, { context, time });
  }

  warn(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('warn', message, { context, time });
  }
}
