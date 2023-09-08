import winston, { Logger } from 'winston';

let logger: Logger;

const createLogger = (loggerName: string) => {
  logger = winston.createLogger({
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
