const getTimeStamp = (): string => {
  return new Date().toISOString();
};

enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug'
}

const logger = (logLevel: LogLevel, namespace: string, message: string, object?: any) => {
  let color = '\x1b[36m%s\x1b[0m';
  switch (logLevel) {
    case LogLevel.WARN:
      color = '\x1b[33m';
      break;
    case LogLevel.DEBUG:
      color = '\x1b[35m';
      break;
    case LogLevel.ERROR:
      color = '\x1b[31m';
      break;
    default:
      color = '\x1b[36m%s\x1b[0m';
  }
  if (object) {
    console[logLevel](`[${getTimeStamp()}] [${logLevel.toUpperCase()}] [${namespace}] ${message}`, object);
    return;
  }
  console[logLevel](color, `[${getTimeStamp()}] [${logLevel.toUpperCase()}] [${namespace}] ${message}`);
};

export { logger, LogLevel };
