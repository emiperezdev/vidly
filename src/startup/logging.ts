import { createLogger, format, transports } from 'winston';
import winstonMongoDB from 'winston-mongodb';

const mongoDBTransport = new winstonMongoDB.MongoDB({
  db: 'mongodb://localhost/vidly',
  options: { useUnifiedTopology: true },
  collection: 'logs',
});

const logFormat = format.combine(
  format.timestamp(),
  format.json()
);

const logger = createLogger({
  format: logFormat,
  transports: [
    new transports.File({ filename: 'logfile.log' }),
    new transports.Console( { format: format.simple() }),
    mongoDBTransport,
  ],
});

function logging() {
  process.on('uncaughtException', (ex: Error | any) => {
    logger.error(ex.message, ex);
    process.exit(1);
  });

  process.on('unhandledRejection', (ex: Error) => {
    logger.error(ex.message, ex);
    process.exit(1);
  });
}

export { logging, logger };
