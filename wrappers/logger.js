import winston from 'winston';

export const LOG = new winston.Logger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      colorize: true,
      stderrLevels: ['error'],
      timestamp: true,
      prettyPrint: true,
      humanReadableUnhandledException: true
    })
  ]
});
