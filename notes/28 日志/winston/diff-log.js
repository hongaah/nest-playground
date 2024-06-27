import winston from 'winston';

/**
 * 使用不同的 logger 来打印日志
 *
 * 其中一个只写入 console，另一个只写入 file，并且 format 都不同。
 */

winston.loggers.add('console', {
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
  transports: [new winston.transports.Console()],
});

winston.loggers.add('file', {
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({
      dirname: 'log4',
      filename: 'test.log',
      format: winston.format.json(),
    }),
  ],
});

const logger1 = winston.loggers.get('console');

logger1.info('aaaaa');
logger1.error('bbbbb');

const logger2 = winston.loggers.get('file');

logger2.info('xxxx');
logger2.info('yyyy');
