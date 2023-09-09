import winston, { Logger } from 'winston';

let logger: Logger;

const createLogger = loggerName => {
  logger = winston.createLogger({
    levels: {
      emerg: 0,
      alert: 1,
      crit: 2,
      error: 3,
      warning: 4,
      notice: 5,
      info: 6,
      debug: 7,
      trace: 8
    },
    level: 'info',
    defaultMeta: { service: loggerName },
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console()
    ]
  });

  logger.info(`Setting log level to [${logger.level}]`);

  return logger;
};

const getLogger = () => {
  return logger || createLogger('default');
};

export {
  createLogger,
  getLogger
};
