/**
 * logger
 *
 * logger: 是否开启日志，或引用哪个 logger 实例，枚举值：false、['error']、new CustomLogger()
 * bufferLogs: 先不打印日志，把它放到 buffer 缓冲区，直到用 useLogger 指定了 Logger 并且应用初始化完毕
 */
export const loggerConfig = {
  // logger: false,
  bufferLogs: true,
};
