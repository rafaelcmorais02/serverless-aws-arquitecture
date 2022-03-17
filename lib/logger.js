import pino from 'pino';

// log levels system
const levels = {
  http: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

// create a Pino logger
const logger = pino({
  // set the own levels
  customLevels: levels,
  // use only the custom levels
  useOnlyCustomLevels: true,
  // the minimum log level to be display
  level: 'http',
});

// export the logger
export default logger;
