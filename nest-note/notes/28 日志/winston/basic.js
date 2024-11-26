import winston from 'winston';
import 'winston-daily-rotate-file';

const file = new winston.transports.File({
  dirname: 'log',
  filename: 'test.log',
  maxsize: 1024,
});

const logger = winston.createLogger({
  /**
   * level
   *
   * 重要级别依次递减，选择哪个则之前的都会包括，可以根据级别来过滤日志
   * error warning info http verbose debug silly
   */
  level: 'debug',

  /**
   * format 输出格式
   */
  // format: winston.format.simple(),
  format: winston.format.combine(
    // winston.format.colorize(),
    // winston.format.simple(),
    winston.format.json(),
    winston.format.label({ label: 'my-app' }),
    winston.format.timestamp(),
  ),

  /**
   * transports
   *
   * transports 可以把日志传输到 console、file、通过 http 发送到别的服务，写入 mongodb 数据库等。
   *
   * 内置对象：Console、File、Http、Stream，可以用 clear、add、remove 方法来动态增删。
   */
  transports: [
    /**
     * 不同的 transport 可以指定不同的格式
     */
    // new winston.transports.Console(),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),

    /**
     * 滚动日志的 transport，可以根据日期来自动分割日志文件。
     */
    new winston.transports.DailyRotateFile({
      level: 'info',
      dirname: 'log2',
      filename: 'test-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH-mm',
      maxSize: '1k',
    }),
    // new winston.transports.File({
    //   dirname: 'log',
    //   filename: 'test.log',
    //   maxsize: 1024,
    // }),

    /**
     * 使用 http 的 transport 来传输日志
     *
     * eg: node basic.js 后日志向本地服务发起一个请求，将日志传输到服务器
     */
    new winston.transports.Http({
      host: 'localhost',
      port: '3000',
      path: '/my-logger/log',
    }),
  ],

  /**
   * exceptionHandlers 支持指定如何处理未捕获的错误的日志
   */
  exceptionHandlers: [
    new winston.transports.File({
      filename: 'error.log',
    }),
  ],

  /**
   * rejectionHandlers Promise 的未捕获异常也可以指定如何处理日志
   */
  rejectionHandlers: [
    new winston.transports.File({
      filename: 'rejection.log',
    }),
  ],
});

logger.add(file);
logger.remove(file);

logger.info('·············');
logger.error(1111111111111);
logger.debug(6666666666666);

(async function () {
  throw Error('async error');
})();

throw new Error('sync errror');
